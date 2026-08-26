import HomeComponent from "@/components/sections/home";
import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import ContactComponent from "@/components/sections/contact";

export default function Home() {
  return (
    <div className='flex flex-col gap-24 sm:gap-28 md:gap-36 pb-20 w-full'>
      {/* 1. Hero & Introduction */}
      <section className='scroll-mt-20 w-full' id='home'>
        <HomeComponent />
      </section>

      {/* 2. Professional Experience */}
      <section className='scroll-mt-20 w-full pt-4' id='experience'>
        <Experience />
      </section>

      {/* 3. Skills & Technologies */}
      <section className='scroll-mt-20 w-full pt-4' id='skills'>
        <Skills />
      </section>

      {/* 4. Featured Projects with 1-Row Clickable Cards */}
      <section className='scroll-mt-20 w-full pt-4' id='projects'>
        <Projects />
      </section>

      {/* 5. Functional Direct Email Contact Form */}
      <section className='scroll-mt-20 w-full pt-4' id='contact'>
        <ContactComponent />
      </section>
    </div>
  );
}
