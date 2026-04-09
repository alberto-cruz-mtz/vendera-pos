import { ModalFooter } from "@components/modals/ModalFooter";
import { ModalTitle } from "@components/modals/ModalTitle";
import {
  ModalWrapper,
  type ModalOpenProps,
} from "@components/modals/ModalWrapper";
import { Input } from "@heroui/react";

type CashFlowType = "inflow" | "outflow";

interface Props extends ModalOpenProps {
  type: CashFlowType;
}

export const CashFlowModal = ({ type, ...props }: Props) => {
  return (
    <ModalWrapper
      startContent={<CashFlowModalHeader type={type} />}
      endContent={(onClose) => <ModalFooter onClose={onClose} />}
      {...props}
    >
      <form>
        <Input
          name="price"
          color="primary"
          startContent={<span className="text-sm">$</span>}
          variant="faded"
          size="sm"
          label="Precio"
          labelPlacement="outside-top"
          defaultValue="0.00"
        />
        <Input
          name="comment"
          variant="faded"
          color="primary"
          size="sm"
          label="Comentarios"
          labelPlacement="outside-top"
          defaultValue={defaultValueCommentInput[type]}
        />
      </form>
    </ModalWrapper>
  );
};

const CashFlowModalHeader = ({ type }: Pick<Props, "type">) => {
  const title = defaultValueCommentInput[type].toUpperCase();
  return <ModalTitle value={title} />;
};

const defaultValueCommentInput = {
  inflow: "Entrada de efectivo",
  outflow: "Salida de efectivo",
};
