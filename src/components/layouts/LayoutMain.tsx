import { Header, Panel } from "../features/ui";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuList } from "../features/menu";
import { MessagesList } from "../features/messages";
import { NotificationsList } from "../features/notifications";

interface Props {
  children: React.ReactNode;
}

const panelTypes = {
  messages: "messages",
  notifications: "notifications",
  menu: "menu",
};

const panelTitles = {
  messages: "Mensajes",
  notifications: "Notificaciones",
  menu: "Menú",
};

export const LayoutMain = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [classMedia, setClassMedia] = useState("")
  let screenSM = window.matchMedia("(max-width: 639px)").matches

  const handleMain = useCallback(() => {
    if(!screenSM) {
      setClassMedia("")
    }
    
    if(isOpen && !screenSM) {
      setClassMedia("")
    }
    
    if(!isOpen && screenSM) {
      setClassMedia("")
    }

    if(isOpen && screenSM) {
      setClassMedia("hidden")
    }
  }, [screenSM, isOpen])

  window.matchMedia("(max-width: 639px)").addEventListener('change', (e) => {
    screenSM = e.matches
    handleMain()
  })

  useEffect(() => { handleMain() }, [handleMain])

  const handleOpenPanel = (panelType?: string) => {
    if (isOpen) {
      if (panelType !== type)
        setType(panelTypes[panelType as keyof typeof panelTypes]);
      if (panelType === type) setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    setTitle(panelTitles[panelType as keyof typeof panelTitles]);
    setType(panelTypes[panelType as keyof typeof panelTypes]);
  };

  return (
    <>
      <Header handleOpenPanel={handleOpenPanel} />
      <div className="flex">
        <motion.main className={`${classMedia} duration-150`}> {children} </motion.main>
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              className="w-screen min-[640px]:w-[var(--panel-size)] h-[calc(100vh-var(--header-size))] p-2 panel"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: .3 }} 
            >
              <Panel title={title}>
                {type === "menu" && <MenuList />}
                {type === "messages" && <MessagesList />}
                {type === "notifications" && <NotificationsList />}
              </Panel>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
