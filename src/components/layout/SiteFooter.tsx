import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SITE_VERSION } from "@/lib/version";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <Container className="py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            muga.dev · notas de laboratorio técnico · v{SITE_VERSION}
          </p>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
