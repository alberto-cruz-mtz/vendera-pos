import { useModalStore } from "@contexts/modal/modal-store";
import { Button } from "@heroui/react";

export const Checkout = () => {
  const open = useModalStore((state) => state.open);

  const handleOpen = () => open("COLLECT_PAYMENT", "reject");

  return (
    <article className="flex items-center gap-4">
      <Button onPress={handleOpen} size="lg" variant="shadow" color="primary">
        F12 - Cobrar
      </Button>
      <span className="text-primary text-4xl font-bold proportional-nums">
        $0.00
      </span>
    </article>
  );
};
