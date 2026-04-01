import { ButtonGroup, Button } from "@heroui/react";
import { IconReload, IconFilePlus, IconFileMinus } from "@tabler/icons-react";

export const SaleInfo = () => {
  return (
    <article className="space-y-1">
      <div className="space-x-3">
        <span className="text-primary-500 text-lg font-medium">1</span>
        <span>Productos en la venta actual</span>
      </div>
      <ButtonGroup size="sm" variant="faded">
        <Button
          startContent={<IconReload size={15} className="text-primary" />}
        >
          F5 - Cambiar
        </Button>
        <Button
          startContent={<IconFilePlus size={15} className="text-success" />}
        >
          F6 - Pendiente
        </Button>
        <Button
          startContent={<IconFileMinus size={15} className="text-danger" />}
        >
          Eliminar
        </Button>
      </ButtonGroup>
    </article>
  );
};
