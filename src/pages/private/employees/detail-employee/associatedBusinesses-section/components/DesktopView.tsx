import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EmployeeModel } from "../../../../../../core/models/api/employee.model";
import { useTableStyles } from "../../../../../../core/styles/useTableStyles";
import { formatDateToString } from "../../../../../../core/utilities/helpers/dateFormat";
import { ButtonDelete } from "./ButtonDelete";

interface Props {
  employee: EmployeeModel;
  onDeleteBusiness?: (businessId: string) => void;
  canDelete: boolean;
}

export const DesktopView = ({
  employee,
  onDeleteBusiness,
  canDelete,
}: Props) => {
  const { tableContainerStyle, headerTableCellStyle, bodyTableCellStyle } =
    useTableStyles();
  return (
    <TableContainer sx={{ ...tableContainerStyle, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headerTableCellStyle}>Nombre</TableCell>
            <TableCell sx={headerTableCellStyle}>Dirección</TableCell>
            <TableCell sx={headerTableCellStyle}>Teléfono</TableCell>
            <TableCell sx={headerTableCellStyle}>Creado</TableCell>
            <TableCell sx={headerTableCellStyle}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employee?.user.businesses.map((business) => (
            <TableRow key={business.id}>
              <TableCell sx={bodyTableCellStyle}>{business.name}</TableCell>
              <TableCell sx={bodyTableCellStyle}>
                {`${business.address.street}, #${business.address.number}, ${business.address.municipality}, ${business.address.city}`}
              </TableCell>
              <TableCell sx={bodyTableCellStyle}>{business.phone}</TableCell>
              <TableCell sx={bodyTableCellStyle}>
                {formatDateToString(business.createdAt || new Date())}
              </TableCell>
              <TableCell sx={bodyTableCellStyle}>
                <ButtonDelete
                  businessId={business.id?.toString() || ""}
                  onDeleteBusiness={onDeleteBusiness}
                  canDelete={canDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
