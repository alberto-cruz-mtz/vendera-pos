import { ModalFooter } from "@components/modals/ModalFooter";
import {
  ModalWrapper,
  type ModalOpenProps,
} from "@components/modals/ModalWrapper";
import { Input } from "@heroui/react";
import { useId, type SubmitEventHandler } from "react";

export const CommonProductModal = (props: ModalOpenProps) => {
  const formId = useId();

  const handleSubmit: SubmitEventHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log(formData);
  };
  return (
    <ModalWrapper
      classNames={{ end: "pt-0 px-5 pb-4" }}
      startContent={<h1 className="text-primary font-bold">PRODUCTO COMUN</h1>}
      endContent={(onClose) => (
        <ModalFooter
          buttonProps={{ action: { type: "submit", form: formId } }}
          onClose={onClose}
        />
      )}
      {...props}
    >
      <form
        onSubmit={handleSubmit}
        id={formId}
        className="border-divider space-y-4 rounded-md border px-3 py-2"
      >
        <Input
          name="description"
          variant="faded"
          color="primary"
          size="sm"
          label="Descripcion del producto"
          labelPlacement="outside-top"
          defaultValue="Producto Comun"
        />
        <div className="flex items-center gap-4">
          <Input
            name="quantity"
            color="primary"
            variant="faded"
            size="sm"
            label="Cantidad"
            labelPlacement="outside-top"
            defaultValue="1.000"
          />
          <span className="h-full">X</span>
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
        </div>
      </form>
    </ModalWrapper>
  );
};
