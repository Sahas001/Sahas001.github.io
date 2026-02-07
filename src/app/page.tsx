"use client";

import { JSX } from 'react';
import Home from '@/sections/Home';
import Projects from '@/sections/Projects';
import About from '@/sections/About';
import TerminalNav from '@/components/TerminalNav';
import TerminalFooter from '@/components/TerminalFooter';
import { useSearchParams } from 'next/navigation';
import TerminalHeader from '@/components/TerminalHeader';

type TabProps = {
  name: string;
  content: JSX.Element;
};

type Tabs = {
  [key: string]: TabProps;
};

export default function Page() {
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
    }
  }

  const params = useSearchParams();
  const tab = params.get("tab");
  const selected = tab && tabs[tab] ? tab : "home";

  return (
    <div className="min-h-screen p-6 sm:p-10 flex flex-col">
      <TerminalHeader />
      {/*       <pre className="font-mono text-sm sm:text-base leading-snug text-[#8ec07c]"> */}
      {/*         {String.raw` */}
      {/* ███████╗ █████╗ ██╗  ██╗ █████╗ ███████╗    ████████╗██╗███╗   ███╗██╗██╗     ███████╗██╗███╗   ██╗ █████╗  */}
      {/* ██╔════╝██╔══██╗██║  ██║██╔══██╗██╔════╝    ╚══██╔══╝██║████╗ ████║██║██║     ██╔════╝██║████╗  ██║██╔══██╗ */}
      {/* ███████╗███████║███████║███████║███████╗       ██║   ██║██╔████╔██║██║██║     ███████╗██║██╔██╗ ██║███████║ */}
      {/* ╚════██║██╔══██║██╔══██║██╔══██║╚════██║       ██║   ██║██║╚██╔╝██║██║██║     ╚════██║██║██║╚██╗██║██╔══██║ */}
      {/* ███████║██║  ██║██║  ██║██║  ██║███████║       ██║   ██║██║ ╚═╝ ██║██║███████╗███████║██║██║ ╚████║██║  ██║ */}
      {/* ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝       ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ */}
      {/* `} */}
      {/*       </pre> */}
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
      <div className="mt-2 sm:mt-4 flex-1">
        {tabs[selected].content}
      </div>
      <TerminalFooter />
    </div>

  );
}
