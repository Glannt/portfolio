import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Architecture Portfolio",
  description: "Explore full-stack, cloud architecture, and IoT systems built by Thanh Do.",
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full'>
      <div className='w-full max-w-6xl text-left'>{children}</div>
    </section>
  );
}
