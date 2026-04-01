import { Button } from "@heroui/react";
import {
  IconFileUnknown,
  IconSearch,
  IconTag,
  IconCashBanknoteEdit,
  IconCashBanknoteMinus,
} from "@tabler/icons-react";
import { type ReactNode } from "react";

interface ShortcutAction {
  label: string;
  icon: ReactNode;
}

export const ActionButtons = () => {
  const actions: ShortcutAction[] = [
    {
      label: "CTRL + P Art. Comun",
      icon: <IconFileUnknown size={15} />,
    },
    {
      label: "F10 Buscar",
      icon: <IconSearch size={15} className="text-primary" />,
    },
    {
      label: "F11 Mayoreo",
      icon: <IconTag size={15} className="text-warning" />,
    },
    {
      label: "F8 Entrada",
      icon: <IconCashBanknoteEdit size={15} className="text-success" />,
    },
    {
      label: "F9 Salida",
      icon: <IconCashBanknoteMinus size={15} className="text-danger" />,
    },
  ];

  return (
    <div className="flex gap-2">
      {actions.map(({ label, icon }) => (
        <Button key={label} size="sm" variant="faded" startContent={icon}>
          {label}
        </Button>
      ))}
    </div>
  );
};
