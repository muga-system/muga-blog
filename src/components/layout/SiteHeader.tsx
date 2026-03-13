import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <Container className="py-5">
        <nav className="flex items-center justify-between" aria-label="Principal">
          <Link href="/" className="text-base font-medium tracking-tight">
            muga.dev
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted">
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
