"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function LogoSwitcher() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark
    ? "/logos/Eventezer-dark.svg"
    : "/logos/Eventezer-light.svg";

  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      {mounted ? (
        <Image
          src={src}
          alt="Eventezer"
          width={140}
          height={28}
          className="h-7 w-auto"
          priority
          unoptimized
        />
      ) : (
        <span className="h-7 w-[140px] rounded-md bg-muted animate-pulse" />
      )}
    </Link>
  );
}
