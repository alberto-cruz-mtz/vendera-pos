import {
  Button,
  ButtonGroup,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  IconCheck,
  IconPencil,
  IconSearch,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";
import { ModalTitle } from "./ModalTitle";
import { ModalWrapper, type ModalOpenProps } from "./ModalWrapper";

export const SearchProductModal = (props: ModalOpenProps) => {
  return (
    <ModalWrapper
      size="3xl"
      {...props}
      startContent={<ModalTitle value="BUSQUEDA DE PRODUCTOS" />}
      endContent={(onClose) => <ActionButtons onClose={onClose} />}
    >
      <Input
        startContent={<IconSearch size={15} />}
        variant="faded"
        size="sm"
      />
      <div className="h-100 min-h-0 p-2">
        <Table
          color="primary"
          selectionMode="single"
          classNames={{
            wrapper: "p-0",
            base: "max-h-100",
          }}
        >
          <TableHeader>
            <TableColumn>Descripcion</TableColumn>
            <TableColumn>Precio de venta</TableColumn>
            <TableColumn>Departamento</TableColumn>
            <TableColumn>Inventario</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }, (_, k) => k + 1).map((value) => (
              <TableRow key={value}>
                <TableCell>Arroz</TableCell>
                <TableCell className="bg-success-50 w-30">$10</TableCell>
                <TableCell className="w-50">Alimentos</TableCell>
                <TableCell className="w-25">20</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ModalWrapper>
  );
};

const ActionButtons = ({ onClose }: { onClose: () => void }) => {
  return (
    <footer className="flex w-full flex-col items-center gap-2">
      <ButtonGroup size="sm" variant="faded">
        <Button
          startContent={<IconPencil size={15} className="text-warning" />}
        >
          Modificar
        </Button>
        <Button
          startContent={<IconStarFilled size={15} className="text-warning" />}
        >
          Marcar como Favorito
        </Button>
        <Button startContent={<IconTrash size={15} className="text-danger" />}>
          Eliminar Producto
        </Button>
      </ButtonGroup>
      <ButtonGroup size="sm" variant="faded">
        <Button startContent={<IconCheck size={15} className="text-success" />}>
          ENTER - Aceptar
        </Button>
        <Button onPress={onClose}>ESC - Cancelar</Button>
      </ButtonGroup>
    </footer>
  );
};
