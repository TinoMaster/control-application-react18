import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingCircularProgress } from "../../../../components/common/ui/loaders/LoadingCircularProgress";
import { useBusinessStore } from "../../../../core/store/business.store";
import { useEmployees } from "../../../../core/hooks/useEmployees";
import { zodEmployeeToEmployeeMapper } from "../../../../core/mappers/global.mapper";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { FormAddEmployee } from "./components/FormAddEmployee";
import {
  registerEmployeeSchema,
  TRegisterEmployeeDataModel,
  zEmployeeDefaultValues,
} from "./zod/registerEmployee";

const NewEmployee = () => {
  const businessList = useBusinessStore((state) => state.businessList);
  const business = useBusinessStore((state) => state.business);
  const { saveEmployee, loadingSave } = useEmployees();

  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TRegisterEmployeeDataModel>({
    resolver: zodResolver(registerEmployeeSchema),
    defaultValues: {
      ...zEmployeeDefaultValues,
    },
  });

  const onSubmit: SubmitHandler<TRegisterEmployeeDataModel> = async (data) => {
    const businessesToSave = businessList.filter((b) =>
      data.businesses.includes(b.id as number)
    );

    const dataToSave: EmployeeModel = zodEmployeeToEmployeeMapper(
      data,
      businessesToSave
    );

    saveEmployee(dataToSave);
  };

  useEffect(() => {
    reset({
      ...zEmployeeDefaultValues,
      businesses: [business.id],
    });
  }, [business, reset]);

  return (
    <>
      <LoadingCircularProgress loading={loadingSave} />
      <FormAddEmployee
        control={control}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        loading={loadingSave}
        businessList={businessList}
        expanded={expanded}
        handleChange={handleChange}
      />
    </>
  );
};

export default NewEmployee;
