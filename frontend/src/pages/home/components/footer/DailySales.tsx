import { useModalStore } from "@contexts/modal/modal-store";
import { Button } from "@heroui/react";
import { IconTicket } from "@tabler/icons-react";

export const DailySales = () => {
  const open = useModalStore((state) => state.open);

  const handleClick = () => open("TODAY_SALES", "reject");

  return (
    <Button
      onPress={handleClick}
      startContent={<IconTicket size={20} className="text-primary" />}
      variant="faded"
      size="sm"
      className="w-60"
    >
      Ventas del dia
    </Button>
  );
};
