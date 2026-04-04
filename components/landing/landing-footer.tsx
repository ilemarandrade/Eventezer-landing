import Link from "next/link";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "@/lib/constants";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eventezer. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href={APP_REGISTER_URL}
            className="text-primary hover:underline"
          >
            Registro
          </a>
          <a href={APP_LOGIN_URL} className="text-muted-foreground hover:text-foreground">
            Login
          </a>
          <Link href="#faq" className="text-muted-foreground hover:text-foreground">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}
