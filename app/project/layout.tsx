import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project",
  description: "View project ",
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block max-w-screen-md text-center justify-center'>{children}</div>
    </section>
  );
}
