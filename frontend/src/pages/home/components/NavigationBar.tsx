import { Button } from "@heroui/react";
import { IconLogout } from "@tabler/icons-react";

export const NavigationBar = () => {
  const pages = ["F1 Ventas", "F3 Productos", "F4 Inventario", "Corte"];

  return (
    <nav className="flex gap-2 py-1">
      {pages.map((label) => (
        <Button key={label} size="sm" variant="bordered">
          {label}
        </Button>
      ))}
      <Button
        startContent={<IconLogout size={15} />}
        className="ml-auto"
        size="sm"
        variant="ghost"
        color="danger"
      >
        Salir
      </Button>
    </nav>
  );
};
