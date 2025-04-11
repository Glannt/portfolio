"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/tabs";

import AboutComponent from "@/components/sections/about";
import Education from "@/components/sections/educations";
import Skills from "@/components/sections/skills";

export default function ResumePage() {
  const [activeSection, setActiveSection] = React.useState<string>("education");

  return (
    <div className='flex flex-col gap-8'>
      <div className='w-full'>
        <h2 className='text-3xl font-bold mb-4'>Why Hire me?</h2>

        <Tabs
          className='w-full flex justify-center'
          selectedKey={activeSection}
          onSelectionChange={(key) => setActiveSection(key as string)}
        >
          <Tab key='education' title='Education' />
          <Tab key='skills' title='Skills' />
          <Tab key='aboutMe' title='About me' />
        </Tabs>
      </div>

      <div className='w-full'>
        {/* Content section */}
        {activeSection === "education" && (
          <div>
            <h2 className='text-2xl font-bold mb-4'>Education</h2>
            <Education />
          </div>
        )}

        {activeSection === "skills" && (
          <div>
            <h2 className='text-2xl font-bold mb-4'>Skills</h2>
            <Skills />
          </div>
        )}

        {activeSection === "aboutMe" && (
          <div>
            <h2 className='text-2xl font-bold mb-4'>About Me</h2>
            <AboutComponent />
          </div>
        )}
      </div>
    </div>
  );
}
