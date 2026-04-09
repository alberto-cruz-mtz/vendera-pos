import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import type { ProductSellItem } from "src/types/product";
import mockProducts from "./../../mock/product-sell-items.json";

const products: ProductSellItem[] = mockProducts;

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
      <TableHeader columns={COLUMNS}>
        {({ label, key }) => <TableColumn key={key}>{label}</TableColumn>}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item.barcode}>
            <TableCell className="bg-primary-50 w-35">{item.barcode}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="w-30 slashed-zero tabular-nums">
              ${item.salePrice}
            </TableCell>
            <TableCell className="w-30">{item.quantity}</TableCell>
            <TableCell className="bg-success-50 w-30 slashed-zero tabular-nums">
              ${item.amount}
            </TableCell>
            <TableCell className="w-30">{item.stock}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const COLUMNS = [
  { key: "barcode", label: "Codigo de barras" },
  { key: "description", label: "Descripcion" },
  { key: "salePrice", label: "Precio de venta" },
  { key: "quantity", label: "Cant." },
  { key: "amount", label: "Importe" },
  { key: "stock", label: "Existencia" },
];
