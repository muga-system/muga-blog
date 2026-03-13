import type { Metadata } from "next";
import { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muga.dev"),
  title: {
    default: "muga.dev",
    template: "%s | muga.dev",
  },
  description:
    "Cuaderno técnico público de muga.dev: procesos, descubrimientos, hallazgos y resultados.",
  openGraph: {
    type: "website",
    siteName: "muga.dev",
    title: "muga.dev",
    description:
      "Cuaderno técnico público de muga.dev: procesos, descubrimientos, hallazgos y resultados.",
    url: "https://muga.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem("theme-preference");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
                  document.documentElement.setAttribute("data-theme", theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <div className="min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

