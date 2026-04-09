import Panel from "@layouts/Panel";
import Principal from "@layouts/Principal";
import Footer from "./Footer";
import Header from "./Header";
import SellSection from "./SellSection";
import { ModalHost } from "@components/modals/ModalHost";

export default function Home() {
  return (
    <Principal>
      <Header />
      <Panel>
        <SellSection />
        <Footer />
      </Panel>
      <ModalHost />
    </Principal>
  );
}
