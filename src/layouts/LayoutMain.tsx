import { Header, Panel } from "../components/features/ui";
import { useState } from "react";
import { Menu } from "../components/features/ui/menu";
import { Navbar } from "@/components/features";

interface Props {
  children: React.ReactNode;
}

export const LayoutMain = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(
    window.matchMedia("(max-width: 639px)").matches
  );

  window.matchMedia("(max-width: 639px)").addEventListener("change", (e) => {
    setScreenSize(e.matches);
  });

  const handleOpenPanel = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Header handleOpenPanel={handleOpenPanel} />
      <div className="absolute flex w-full">
        <main className={`${screenSize && isOpen && "hidden"}`}>
          {children}
        </main>
        <aside
          className={`sticky top-0 right-0 py-2 pr-2 pl-1 transition ${
            !screenSize && isOpen && "max-w-xs w-full"
          } ${screenSize && !isOpen && "hidden"} ${
            screenSize && isOpen && "w-full pl-2"
          } ${!screenSize && !isOpen && "w-16"}`}
        >
          <Panel title={isOpen ? "Menú" : ""}>
            {!isOpen ? <Navbar /> : <Menu />}
          </Panel>
        </aside>
      </div>
    </>
  );
};
