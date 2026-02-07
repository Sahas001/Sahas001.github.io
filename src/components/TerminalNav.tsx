"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Tabs from "@/components/Tabs";

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/?tab=about" },
  { name: "projects", href: "/?tab=projects" },
  { name: "blog", href: "/blog" },
];

export default function TerminalNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const tab = params.get("tab");
  const active = pathname.startsWith("/blog") ? "blog" : tab || "home";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key !== "h" && e.key !== "l") return;
      e.preventDefault();
      const idx = navItems.findIndex((i) => i.name === active);
      const next = e.key === "l" ? idx + 1 : idx - 1;
      const wrapped = (next + navItems.length) % navItems.length;
      router.push(navItems[wrapped].href);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, router]);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href} className="no-underline">
          <Tabs name={item.name} highlighted={active === item.name} />
        </Link>
      ))}
    </div>
  );
}
