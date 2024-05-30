import { LayoutMain } from "@components/layouts";
import { Panel } from "@/components/features";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
} from "@nextui-org/react";

export const Graduates = () => {
  return (
    <LayoutMain>
      <Panel title="Titulados">
        <Table aria-label="Example static collection table" shadow="none">
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Matricula</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>20198565</TableCell>
              <TableCell>Paso 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Panel>
    </LayoutMain>
  );
};
