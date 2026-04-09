import { useModalStore } from "@contexts/modal/modal-store";
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
  action?: () => void;
}

export const ActionButtons = () => {
  const open = useModalStore((state) => state.open);

  const actions: ShortcutAction[] = [
    {
      label: "CTRL + P Art. Comun",
      icon: <IconFileUnknown size={15} />,
      action: () => open("COMMON_PRODUCT", "reject"),
    },
    {
      label: "F10 Buscar",
      icon: <IconSearch size={15} className="text-primary" />,
      action: () => open("SEARCH_PRODUCT", "reject"),
    },
    {
      label: "F11 Mayoreo",
      icon: <IconTag size={15} className="text-warning" />,
    },
    {
      label: "F8 Entrada",
      icon: <IconCashBanknoteEdit size={15} className="text-success" />,
      action: () => open("CASH_INFLOW", "reject"),
    },
    {
      label: "F9 Salida",
      icon: <IconCashBanknoteMinus size={15} className="text-danger" />,
      action: () => open("CASH_OUTFLOW", "reject"),
    },
  ];

  return (
    <div className="flex gap-2">
      {actions.map(({ label, icon, action }) => (
        <Button
          onPress={action}
          key={label}
          size="sm"
          variant="faded"
          startContent={icon}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
