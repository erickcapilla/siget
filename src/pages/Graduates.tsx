import { LayoutMain } from "@/layouts";
import { Panel } from "@/components/features";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Chip
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
              <TableCell><Chip color="success" variant="flat">Paso 2</Chip></TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>20198565</TableCell>
              <TableCell><Chip color="success" variant="flat">Paso 1</Chip></TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>20198565</TableCell>
              <TableCell><Chip color="success" variant="flat">Paso 2</Chip></TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>20198565</TableCell>
              <TableCell><Chip color="success" variant="flat">Paso 5</Chip></TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>20198565</TableCell>
              <TableCell><Chip color="success" variant="flat">Paso 6</Chip></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Panel>
    </LayoutMain>
  );
};
