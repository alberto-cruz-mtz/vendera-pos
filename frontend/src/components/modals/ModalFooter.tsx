import { Button, type ButtonProps } from "@heroui/react";
import { IconCheck } from "@tabler/icons-react";

interface Props {
  buttonProps?: { action?: ButtonProps; close?: ButtonProps };
  onClick?: () => void;
  onClose?: () => void;
}

export const ModalFooter = ({ onClick, onClose, buttonProps }: Props) => {
  return (
    <footer className="flex items-center gap-4">
      <Button
        {...buttonProps?.action}
        onPress={onClick}
        size="sm"
        variant="faded"
        color="success"
        startContent={<IconCheck size={15} />}
      >
        Aceptar
      </Button>
      <Button
        {...buttonProps?.close}
        onPress={onClose}
        size="sm"
        variant="faded"
        color="danger"
      >
        Cancelar
      </Button>
    </footer>
  );
};
