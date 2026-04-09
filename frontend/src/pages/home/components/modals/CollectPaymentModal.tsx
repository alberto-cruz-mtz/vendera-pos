import { ModalTitle } from "@components/modals/ModalTitle";
import {
  ModalWrapper,
  type ModalOpenProps,
} from "@components/modals/ModalWrapper";
import { Button, Input } from "@heroui/react";
import { IconPrinter } from "@tabler/icons-react";

export const CollectPaymentModal = (props: ModalOpenProps) => {
  return (
    <ModalWrapper
      size="xl"
      startContent={<ModalTitle value="Cobrar" />}
      {...props}
    >
      <div className="flex w-full gap-2">
        <article className="flex h-70 flex-1 flex-col items-center gap-6">
          <span className="text-primary-700 text-5xl font-bold tabular-nums">
            $60.00
          </span>
          <div className="flex flex-col items-start gap-5">
            <Input
              color="primary"
              variant="faded"
              size="lg"
              label="Pago con:"
              labelPlacement="outside-left"
              defaultValue="$60.00"
              classNames={{ label: "text-xl font-bold" }}
            />
            <p className="text-xl font-bold">
              Su cambio:
              <span className="text-primary-700 ml-4 font-medium">$60.00</span>
            </p>
          </div>
        </article>
        <aside className="border-divider border-l px-2">
          <Button
            startContent={<IconPrinter />}
            variant="faded"
            color="primary"
          >
            Cobrar
          </Button>
        </aside>
      </div>
    </ModalWrapper>
  );
};
