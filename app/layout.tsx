import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className='scroll-smooth' lang='en'>
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className='relative flex flex-col min-h-screen'>
            <Navbar />
            <main className='container mx-auto max-w-7xl pt-6 sm:pt-10 px-4 sm:px-6 flex-grow'>
              {children}
            </main>
            <footer className='w-full flex items-center justify-center py-6 border-t border-default-100/80 mt-16'>
              <Link
                isExternal
                className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors'
                href={siteConfig.links.github}
              >
                <span>© {new Date().getFullYear()}</span>
                <span className='font-semibold text-foreground'>Tống Nguyễn Thành Đô</span>
                <span>• All rights reserved</span>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
