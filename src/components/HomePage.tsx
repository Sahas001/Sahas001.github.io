"use client";

import { JSX } from "react";
import { useSearchParams } from "next/navigation";
import Home from "@/sections/Home";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import TerminalNav from "@/components/TerminalNav";
import { AnimatePresence, motion } from "framer-motion";
import TerminalFooter from "@/components/TerminalFooter";
import TerminalHeader from "@/components/TerminalHeader";

type TabProps = {
  name: string;
  content: JSX.Element;
};

type Tabs = {
  [key: string]: TabProps;
};

export default function HomePage() {
  const tabs: Tabs = {
    home: {
      name: "home",
      content: <Home />,
    },
    projects: {
      name: "projects",
      content: <Projects />,
    },
    about: {
      name: "about",
      content: <About />,
    },
  };

  const params = useSearchParams();
  const tab = params.get("tab");
  const selected = tab && tabs[tab] ? tab : "home";

  return (
    <div className="min-h-screen p-6 sm:p-10 flex flex-col">
      <TerminalHeader />
      <div className="ascii-wrap">
        <pre className="ascii-block">
          {`

███████╗ █████╗ ██╗  ██╗ █████╗ ███████╗
██╔════╝██╔══██╗██║  ██║██╔══██╗██╔════╝
███████╗███████║███████║███████║███████╗
╚════██║██╔══██║██╔══██║██╔══██║╚════██║
███████║██║  ██║██║  ██║██║  ██║███████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

`}
        </pre>
        <pre className="ascii-block">
          {`

████████╗██╗███╗   ███╗██╗██╗     ███████╗██╗███╗   ██╗ █████╗ 
╚══██╔══╝██║████╗ ████║██║██║     ██╔════╝██║████╗  ██║██╔══██╗
   ██║   ██║██╔████╔██║██║██║     ███████╗██║██╔██╗ ██║███████║
   ██║   ██║██║╚██╔╝██║██║██║     ╚════██║██║██║╚██╗██║██╔══██║
   ██║   ██║██║ ╚═╝ ██║██║███████╗███████║██║██║ ╚████║██║  ██║
   ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
`}
        </pre>
      </div>
      <TerminalNav />
      <div className="mt-2 sm:mt-4 flex-1 relative min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {tabs[selected].content}
          </motion.div>
        </AnimatePresence>
      </div>
      <TerminalFooter />
    </div>
  );
}
