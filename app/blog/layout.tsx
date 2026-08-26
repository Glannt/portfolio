import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevOps & VPS Production Handbook",
  description: "Obsidian-style knowledge base for Linux VPS hardening, Docker tuning, Traefik SSL proxy, and Blue-Green CI/CD.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-4 sm:py-8 w-full'>
      <div className='w-full max-w-7xl'>{children}</div>
    </section>
  );
}
