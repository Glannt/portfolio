"use client";

import type { Key } from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tab, Tabs } from "@heroui/react";

import ProjectCard from "../project-card";

import { projects } from "@/data/projects";

const categories = [
  { key: "all", title: "All Projects" },
  { key: "web", title: "Web" },
  { key: "backend", title: "Backend" },
  { key: "iot", title: "IoT" },
  { key: "app", title: "App" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(activeCategory));

  const handleSelectionChange = (key: Key) => {
    setActiveCategory(String(key));
  };

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

  const projectGrid = (
    <motion.div
      className='grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-8'
      initial='hidden'
      variants={containerVariants}
      viewport={{ once: true }}
      whileInView='visible'
    >
      {filteredProjects.map((project) => (
        <motion.div key={project.id} className='min-w-0' variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section className='w-full space-y-10'>
      <motion.div
        className='max-w-3xl space-y-4'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>My Projects</h2>
        <p className='text-muted-foreground md:text-xl'>
          A showcase of my recent work, personal projects, and contributions.
        </p>
      </motion.div>

      <Tabs
        className='w-full'
        classNames={{
          base: "w-full",
          panel: "pt-8",
          tabList: "flex justify-start",
          tab: "px-4 py-2",
        }}
        color='primary'
        selectedKey={activeCategory}
        variant='underlined'
        onSelectionChange={handleSelectionChange}
      >
        {categories.map((category) => (
          <Tab key={category.key} title={category.title}>
            {projectGrid}
          </Tab>
        ))}
      </Tabs>
    </section>
  );
}
