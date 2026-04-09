type ModalId =
  | "SEARCH_PRODUCT"
  | "COMMON_PRODUCT"
  | "CASH_INFLOW"
  | "CASH_OUTFLOW"
  | "TODAY_SALES"
  | "COLLECT_PAYMENT";

export type ActiveModal = { type: ModalId } | null;

type CollisionPolicy = "reject" | "replace";

export interface ModalManager {
  activeModal: ActiveModal;
  isOpen: boolean;
  open: <T extends ModalId>(type: T, policy: CollisionPolicy) => boolean;
  close: () => void;
  replace: <T extends ModalId>(type: T) => void;
}
