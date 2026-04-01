import { Input, Button } from "@heroui/react";
import { IconBarcode, IconShoppingBag } from "@tabler/icons-react";

export const ProductEntry = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Codigo de producto</span>
      <Input
        size="sm"
        variant="faded"
        startContent={<IconBarcode size={20} />}
        className="w-125"
      />
      <Button
        size="sm"
        color="primary"
        startContent={<IconShoppingBag size={20} />}
      >
        ENTER - Agregar producto
      </Button>
    </div>
  );
};
