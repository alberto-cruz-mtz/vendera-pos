import { NavigationBar } from "./components/NavigationBar";
import { TitleApp } from "./components/TitleApp";

export default function Header() {
  return (
    <header className="flex flex-col">
      <TitleApp />
      <NavigationBar />
    </header>
  );
}
