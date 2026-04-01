import Panel from "@layouts/Panel";
import Principal from "@layouts/Principal";
import Footer from "./Footer";
import Header from "./Header";
import SellSection from "./SellSection";

export default function Home() {
  return (
    <Principal>
      <Header />
      <Panel>
        <SellSection />
        <Footer />
      </Panel>
    </Principal>
  );
}
