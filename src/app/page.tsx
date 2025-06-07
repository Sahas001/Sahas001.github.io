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
      <pre className="font-mono text-sm sm:text-base leading-snug text-[#8ec07c]">
        {String.raw`
███████╗ █████╗ ██╗  ██╗ █████╗ ███████╗    ████████╗██╗███╗   ███╗██╗██╗     ███████╗██╗███╗   ██╗ █████╗ 
██╔════╝██╔══██╗██║  ██║██╔══██╗██╔════╝    ╚══██╔══╝██║████╗ ████║██║██║     ██╔════╝██║████╗  ██║██╔══██╗
███████╗███████║███████║███████║███████╗       ██║   ██║██╔████╔██║██║██║     ███████╗██║██╔██╗ ██║███████║
╚════██║██╔══██║██╔══██║██╔══██║╚════██║       ██║   ██║██║╚██╔╝██║██║██║     ╚════██║██║██║╚██╗██║██╔══██║
███████║██║  ██║██║  ██║██║  ██║███████║       ██║   ██║██║ ╚═╝ ██║██║███████╗███████║██║██║ ╚████║██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝       ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
`}
      </pre>
      {/* <div className="mt-6 flex flex-col sm:flex-row gap-15"> */}
      {/*   <Button href="https://instagram.com/sahastimilsina" name="Instagram" /> */}
      {/*   <Button href="https://linkedin.com/in/sahas001" name="LinkedIn" /> */}
      {/*   <Button href="https://github.com/Sahas001" name="Github" /> */}
      {/* </div> */}
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
