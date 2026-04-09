import { useModalStore } from "@contexts/modal/modal-store";
import { CashFlowModal } from "@pages/home/components/modals/CashFlowModal";
import { CommonProductModal } from "@pages/home/components/modals/CommonProductModal";
import { SearchProductModal } from "./SearchProductModal";
import { TodaySalesModal } from "@pages/home/components/modals/TodaySalesModal";
import { CollectPaymentModal } from "@pages/home/components/modals/CollectPaymentModal";

export function ModalHost() {
  const activeModal = useModalStore((state) => state.activeModal);
  const close = useModalStore((state) => state.close);
  const isOpen = useModalStore((state) => state.isOpen);

  if (activeModal?.type === "SEARCH_PRODUCT") {
    return <SearchProductModal isOpen={isOpen} onOpenChange={close} />;
  }

  if (activeModal?.type === "COMMON_PRODUCT") {
    return <CommonProductModal isOpen={isOpen} onOpenChange={close} />;
  }

  if (activeModal?.type === "CASH_INFLOW") {
    return <CashFlowModal type="inflow" isOpen={isOpen} onOpenChange={close} />;
  }

  if (activeModal?.type === "CASH_OUTFLOW") {
    return (
      <CashFlowModal type="outflow" isOpen={isOpen} onOpenChange={close} />
    );
  }

  if (activeModal?.type === "TODAY_SALES") {
    return <TodaySalesModal isOpen={isOpen} onOpenChange={close} />;
  }

  if (activeModal?.type === "COLLECT_PAYMENT") {
    return <CollectPaymentModal isOpen={isOpen} onOpenChange={close} />;
  }

  return null;
}
