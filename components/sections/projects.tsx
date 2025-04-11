"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tab, Tabs } from "@heroui/react";

import ProjectCard from "../project-card";

import { projects } from "@/data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const handleSelectionChange = (key: any) => {
    setActiveCategory(key);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className='space-y-12'>
      <motion.div
        className='space-y-4 text-center'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>My Projects</h2>
        <p className='text-muted-foreground md:text-xl max-w-[800px] mx-auto'>
          A showcase of my recent work, personal projects, and contributions.
        </p>
      </motion.div>

      <Tabs
        classNames={{
          tabList: "flex justify-center mb-8",
          tab: "px-4 py-2",
        }}
        color='primary'
        selectedKey={activeCategory}
        variant='underlined'
        onSelectionChange={handleSelectionChange}
      >
        <Tab key='all' title='All Projects'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            initial='hidden'
            variants={containerVariants}
            viewport={{ once: true }}
            whileInView='visible'
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </Tab>
        <Tab key='web' title='Web'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            initial='hidden'
            variants={containerVariants}
            viewport={{ once: true }}
            whileInView='visible'
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </Tab>
        <Tab key='mobile' title='Mobile'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            initial='hidden'
            variants={containerVariants}
            viewport={{ once: true }}
            whileInView='visible'
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </Tab>
        <Tab key='backend' title='Backend'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            initial='hidden'
            variants={containerVariants}
            viewport={{ once: true }}
            whileInView='visible'
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </Tab>
      </Tabs>
    </div>
  );
}
