import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export const SellTable = () => {
  return (
    <Table
      isHeaderSticky
      defaultSelectedKeys={[1]}
      selectionMode="single"
      radius="sm"
      aria-label="Sell Table"
      color="primary"
      classNames={{
        base: "flex-1 min-h-0",
        wrapper: "p-0",
        th: "rounded-none h-8",
      }}
    >
      <TableHeader>
        <TableColumn>Codigo de barras</TableColumn>
        <TableColumn>Descripcion</TableColumn>
        <TableColumn>Precio de venta</TableColumn>
        <TableColumn>Cant.</TableColumn>
        <TableColumn>Importe</TableColumn>
        <TableColumn>Existencia</TableColumn>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }, (_, i) => (
          <TableRow key={i}>
            <TableCell className="w-35">1234567890123</TableCell>
            <TableCell>Producto de ejemplo</TableCell>
            <TableCell className="w-35">$1.000,00</TableCell>
            <TableCell className="w-20">2</TableCell>
            <TableCell className="w-30">$2.000,00</TableCell>
            <TableCell className="w-30">15</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
