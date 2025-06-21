"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const styleLinks = [
  { href: "/", label: "All Styles" },
  { href: "/ijmes", label: "IJMES" },
  { href: "/ala-lc", label: "ALA-LC" },
  { href: "/din-31635", label: "DIN 31635" },
  { href: "/buckwalter", label: "Buckwalter" },
  { href: "/custom", label: "Custom" },
];

export function StyleNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 justify-center mb-8">
      {styleLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === link.href
              ? "bg-[#9d5148] text-white"
              : "bg-white/70 text-neutral-700 hover:bg-white hover:text-[#9d5148]"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}