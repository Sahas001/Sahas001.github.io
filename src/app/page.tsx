import { Suspense } from "react";
import HomeTabs from "@/components/HomeTabs";
import Home from "@/sections/Home";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import { getAllWriting } from "@/lib/posts";

export default async function Page() {
  const latest = (await getAllWriting()).slice(0, 3);
  const home = <Home latest={latest} />;

  return (
    // Only the tab switcher reads search params; the fallback keeps Home in the static HTML.
    <Suspense fallback={home}>
      <HomeTabs home={home} projects={<Projects />} about={<About />} />
    </Suspense>
  );
}
