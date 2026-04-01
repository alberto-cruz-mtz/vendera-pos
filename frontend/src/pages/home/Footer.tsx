import { SaleInfo } from "./components/footer/SaleInfo";
import { Checkout } from "./components/footer/Checkout";
import { Totals } from "./components/footer/Totals";
import { DailySales } from "./components/footer/DailySales";

export default function Footer() {
  return (
    <footer className="space-y-3 rounded-md bg-gray-100 px-4 py-1">
      <section className="border-divider flex items-center justify-between border-b pb-2">
        <SaleInfo />
        <Checkout />
      </section>
      <section className="flex items-center justify-between">
        <Totals />
        <DailySales />
      </section>
    </footer>
  );
}
