import { ActionButtons } from "./components/sell/ActionButtons";
import { ProductEntry } from "./components/sell/ProductEntry";
import { SellTable } from "./components/sell/SellTable";
import { TicketNumber } from "./components/sell/TicketNumber";
import { TicketTable } from "./components/sell/TicketTable";

export default function SellSection() {
  return (
    <main className="flex min-h-0 flex-col">
      <TicketNumber value={3} />
      <section className="space-y-2 rounded-md bg-gray-100 p-1">
        <ProductEntry />
        <ActionButtons />
      </section>
      <section className="flex min-h-0 flex-1 flex-col space-y-2 pt-1">
        <TicketTable />
        <SellTable />
      </section>
    </main>
  );
}
