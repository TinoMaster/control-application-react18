import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBusinessFinalSale } from "../../../../../../../../core/hooks/useBusinessFinalSale";
import { useEmployees } from "../../../../../../../../core/hooks/useEmployees";
import {
  updateBusinessSaleBusinessId,
  updateBusinessSaleDoneBy,
  updateBusinessSaleFound,
  updateBusinessSaleMachines,
  updateBusinessSaleName,
  updateBusinessSaleTotal,
  updateBusinessSaleWorkers,
} from "../../../../../../../../core/states/actions/businessFinalSaleActions";
import { useAuthStore } from "../../../../../../../../core/store/auth.store";
import { useBusinessStore } from "../../../../../../../../core/store/business.store";
import { formatDateToString } from "../../../../../../../../core/utilities/helpers/dateFormat";
import {
  filterEmployeesReadyToWork,
  getTotalSalaryFromEmployees,
} from "../../../../../../../../core/utilities/helpers/globals";
import { useBusinessReportStore } from "../../../../store/businessReport.store";
import {
  ERegisterType,
  SaleResumeZodSchema,
  TSaleResume,
} from "../zod/saleResume.zodSchema";

export const useSaleResume = () => {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const business = useBusinessStore((state) => state.business);
  const businessSale = useBusinessReportStore((state) => state.businessSale);
  const dispatch = useBusinessReportStore((state) => state.dispatch);
  const nextSection = useBusinessReportStore((state) => state.nextSection);

  const { machinesAlreadySelected } = useBusinessFinalSale();
  const { employees, loadingEmployees } = useEmployees();
  const [loading, setLoading] = useState(false);

  const defaultRegisterType =
    businessSale.machines?.length === business.machines?.length
      ? ERegisterType.GENERAL
      : ERegisterType.INDIVIDUAL;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TSaleResume>({
    resolver: zodResolver(SaleResumeZodSchema),
    mode: "all",
    defaultValues: {
      total: businessSale.total.toString(),
      found: businessSale.found?.toString(),
      machines: businessSale.machines || [],
      workers: businessSale.workers || [],
      registerType: defaultRegisterType,
    },
  });

  const registerTypeWatch = watch("registerType");
  const totalWatch = watch("total");
  const debtsWatch = watch("found");

  const handleSelectEmployee = (employeeId: string) => {
    const employee = filterEmployeesReadyToWork(employees).find(
      (e) => e.id === employeeId
    );
    if (employee) {
      const currentWorkers = [...(control._formValues.workers || [])];
      const workerIndex = currentWorkers.findIndex((w) => w.id === employee.id);

      if (workerIndex >= 0) {
        currentWorkers.splice(workerIndex, 1);
      } else {
        currentWorkers.push(employee);
      }

      setValue("workers", currentWorkers, { shouldValidate: true });

      dispatch(updateBusinessSaleWorkers(currentWorkers));
      dispatch(updateBusinessSaleTotal(Number(totalWatch)));
      dispatch(updateBusinessSaleFound(Number(debtsWatch)));
    }
  };

  const createReportName = () => {
    if (registerTypeWatch === ERegisterType.INDIVIDUAL) {
      return `Individual ${formatDateToString(new Date())}`;
    } else {
      return `General ${formatDateToString(new Date())}`;
    }
  };

  const onSubmit = (data: TSaleResume) => {
    setLoading(true);

    const totalSalary = getTotalSalaryFromEmployees(
      Number(data.total),
      data.workers
    );
    console.log(totalSalary);

    dispatch(updateBusinessSaleMachines(data.machines));
    dispatch(updateBusinessSaleWorkers(data.workers));
    dispatch(updateBusinessSaleTotal(Number(data.total)));
    dispatch(updateBusinessSaleFound(Number(data.found)));
    dispatch(updateBusinessSaleDoneBy(user!.id as number));
    dispatch(updateBusinessSaleBusinessId(business.id as number));
    dispatch(updateBusinessSaleName(createReportName()));

    setLoading(false);
    nextSection();
  };

  useEffect(() => {
    if (registerTypeWatch === ERegisterType.INDIVIDUAL) {
      setValue("machines", []);
    } else {
      setValue("machines", business.machines?.map((m) => m.id as number) ?? []);
    }
  }, [registerTypeWatch, setValue, business.machines]);

  return {
    control,
    errors,
    handleSubmit,
    handleSelectEmployee,
    onSubmit,
    loading,
    machinesAlreadySelected,
    loadingEmployees,
    role,
    registerTypeWatch,
    dispatch,
    business,
    employees,
    businessSale,
  };
};
