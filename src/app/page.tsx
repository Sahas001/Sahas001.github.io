"use client";

import { JSX, useState } from 'react';
import Link from 'next/link';
import Home from '@/sections/Home';
import Projects from '@/sections/Projects';
import About from '@/sections/About';
import Tabs from '@/components/Tabs';

type TabProps = {
  name: string;
  content: JSX.Element;
};

type Tabs = {
  [key: string]: TabProps;
};

export default function Page() {
  const [selected, setSelected] = useState<string>("home");

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

  return (
    <div className="min-h-screen p-6 flex flex-col">
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
      <div className="flex flex-row flex-wrap sm:justify-start justify-center">
        <pre className="font-mono text-sm sm:text-base leading-snug text-[#8ec07c]">
          {`

███████╗ █████╗ ██╗  ██╗ █████╗ ███████╗
██╔════╝██╔══██╗██║  ██║██╔══██╗██╔════╝
███████╗███████║███████║███████║███████╗
╚════██║██╔══██║██╔══██║██╔══██║╚════██║
███████║██║  ██║██║  ██║██║  ██║███████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

`}
        </pre>
        <pre className="font-mono text-sm sm:text-base leading-snug text-[#8ec07c]">
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
      <div className="mt-6 flex gap-10">
        <Tabs onClick={() => setSelected("home")} name="" highlighted={selected === "home"} />
        <Tabs onClick={() => setSelected("about")} name="about" highlighted={selected === "about"} />
        <Tabs onClick={() => setSelected("projects")} name="projects" highlighted={selected === "projects"} />
        <Link href="/blog">
          <Tabs name="blog" highlighted={selected === "blog"} />
        </Link>
      </div>
      <div>
        {tabs[selected].content}
      </div>
    </div>

  );
}
