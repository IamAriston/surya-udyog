"use client";

import { usePathname } from "next/navigation";

export function useIsActiveLink(href: string): boolean {
  const pathname = usePathname();
  return pathname === href || pathname.startsWith(href + "/");
}
