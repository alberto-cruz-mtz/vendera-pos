import { Button } from "@heroui/react";

export const Checkout = () => {
  return (
    <article className="flex items-center gap-4">
      <Button size="lg" variant="shadow" color="primary">
        F12 - Cobrar
      </Button>
      <span className="text-primary text-4xl font-bold proportional-nums">
        $0.00
      </span>
    </article>
  );
};
