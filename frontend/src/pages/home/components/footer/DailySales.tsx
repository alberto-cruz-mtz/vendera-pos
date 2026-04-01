import { Button } from "@heroui/react";
import { IconTicket } from "@tabler/icons-react";

export const DailySales = () => {
  return (
    <Button
      startContent={<IconTicket size={20} className="text-primary" />}
      variant="faded"
      size="sm"
      className="w-60"
    >
      Ventas del dia
    </Button>
  );
};
