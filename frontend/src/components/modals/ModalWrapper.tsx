import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import type { ReactNode } from "react";
import type { ModalProps as HeroModalProps } from "@heroui/react";

interface ModalClassNames {
  base?: string;
  start?: string;
  body?: string;
  end?: string;
}

interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  startContent?: ReactNode;
  children?: ReactNode;
  endContent?: (onClose: () => void) => ReactNode;
  classNames?: ModalClassNames;
  size?: HeroModalProps["size"];
}

export type ModalOpenProps = Pick<ModalProps, "isOpen" | "onOpenChange">;

export const ModalWrapper = ({
  isOpen,
  onOpenChange,
  children,
  endContent,
  startContent,
  size,
  classNames,
}: ModalProps) => {
  return (
    // el parametro isOpen de onOpenChange es ignorado ya que no necesitamos
    // manejar el estado de apertura del modal desde este componente, sino que se maneja desde el contexto del modal
    <Modal size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className={classNames?.base}>
        {(onClose) => (
          <>
            <ModalHeader className={`pb-0 ${classNames?.start}`}>
              {startContent}
            </ModalHeader>
            <ModalBody className={classNames?.body}>{children}</ModalBody>
            {endContent && (
              <ModalFooter className={classNames?.end}>
                {endContent(onClose)}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
