"use client";

import Link from "next/link";
import { LogoSwitcher } from "@/components/landing/logo-switcher";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const links = [
  { href: "#caracteristicas", label: "Características" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNavbar() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <LogoSwitcher />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Cambiar tema"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="relative text-foreground"
          >
            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute inset-0 m-auto h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
            <a href={APP_LOGIN_URL}>Login</a>
          </Button>
          <Button size="sm" asChild>
            <a href={APP_REGISTER_URL}>Registrarme</a>
          </Button>
        </div>
      </div>
      <nav className="flex md:hidden border-t border-border px-4 py-2 gap-4 overflow-x-auto text-xs font-medium text-muted-foreground">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap">
            {l.label}
          </Link>
        ))}
        <a href={APP_LOGIN_URL} className="whitespace-nowrap">
          Login
        </a>
        <a href={APP_REGISTER_URL} className={cn("whitespace-nowrap text-primary")}>
          Registrarme
        </a>
      </nav>
    </header>
  );
}
