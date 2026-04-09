import { ModalTitle } from "@components/modals/ModalTitle";
import {
  ModalWrapper,
  type ModalOpenProps,
} from "@components/modals/ModalWrapper";
import {
  Button,
  Card,
  CardBody,
  DatePicker,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  IconCalendarClock,
  IconSearch,
  IconShoppingCart,
} from "@tabler/icons-react";

export const TodaySalesModal = (props: ModalOpenProps) => {
  return (
    <ModalWrapper
      size="4xl"
      startContent={<ModalTitle value="HISTORIAL DE VENTAS" />}
      {...props}
    >
      <div className="grid grid-cols-2 gap-3">
        <section className="space-y-3">
          <Input
            labelPlacement="outside-top"
            label="Puedes buscar por folio o por nombre del ticket"
            startContent={<IconSearch size={15} />}
            size="sm"
            variant="faded"
          />
          <div className="border-divider h-90 overflow-hidden rounded-md border">
            <Table
              removeWrapper
              selectionMode="single"
              color="success"
              classNames={{
                base: "max-h-90 overflow-scroll",
              }}
            >
              <TableHeader>
                <TableColumn>Folio</TableColumn>
                <TableColumn>Arts</TableColumn>
                <TableColumn>Hora</TableColumn>
                <TableColumn>Total</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>4:05 PM</TableCell>
                  <TableCell>$60.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center gap-2">
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              label="Del dia:"
              labelPlacement="outside-left"
              size="sm"
            />
            <Button
              startContent={
                <IconCalendarClock size={25} className="text-danger" />
              }
              size="sm"
              variant="flat"
            >
              Hoy
            </Button>
          </div>
        </section>
        <section className="h-full">
          <Card className="h-auto">
            <CardBody>
              <article className="flex flex-col gap-3">
                <p className="text-secondary text-sm font-medium">
                  Folio: <span className="ml-3 font-normal text-black">8</span>
                </p>
                <p className="text-secondary text-sm font-medium">
                  Cajero:
                  <span className="ml-3 font-normal text-black">
                    Administrador de la tienda
                  </span>
                </p>
                <p className="text-secondary text-sm font-medium">
                  Cliente:
                  <span className="ml-3 font-normal text-black">
                    Publico general
                  </span>
                </p>
              </article>
              <span className="my-3 text-center text-sm font-medium">
                09 de Abril 2026 4:05 PM
              </span>
              <div className="border-divider h-55 overflow-hidden rounded-md border">
                <Table
                  selectionMode="single"
                  removeWrapper
                  classNames={{ base: "max-h-55 overflow-scroll" }}
                >
                  <TableHeader>
                    <TableColumn className="w-15">Cant.</TableColumn>
                    <TableColumn>Descripcion</TableColumn>
                    <TableColumn className="w-15">Importe</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Producto Comun</TableCell>
                      <TableCell>$50</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <Button
                startContent={
                  <IconShoppingCart size={15} className="text-success" />
                }
                variant="faded"
                size="sm"
                className="mt-2"
              >
                Devolver articulo
              </Button>

              <div className="flex">
                <Button
                  className="mt-3"
                  size="sm"
                  variant="flat"
                  color="danger"
                >
                  Cancelar venta
                </Button>
                <article className="mt-3 flex flex-1 flex-col items-end gap-1">
                  <p className="font-bold">
                    PAGO CON:{" "}
                    <span className="ml-20 font-normal tabular-nums">$60</span>
                  </p>
                  <p className="font-bold">
                    TOTAL:{" "}
                    <span className="ml-20 font-normal tabular-nums">$60</span>
                  </p>
                </article>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </ModalWrapper>
  );
};
