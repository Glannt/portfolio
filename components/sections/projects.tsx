"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  ChevronDown,
  Check,
  Globe,
  Server,
  Cpu,
  Smartphone,
  Sparkles,
  Search,
} from "lucide-react";
import { Button, Input } from "@heroui/react";

import { projects, Project } from "@/data/projects";

import ProjectCard from "../project-card";

type CategoryOption = {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const categoryOptions: CategoryOption[] = [
  {
    key: "all",
    title: "All Categories",
    description: "All full-stack, cloud, IoT, and mobile systems",
    icon: <Sparkles className='h-4 w-4 text-primary' />,
  },
  {
    key: "web",
    title: "Web Applications",
    description: "Next.js 16 SSR, React 19, and Vite frontend platforms",
    icon: <Globe className='h-4 w-4 text-sky-500' />,
  },
  {
    key: "backend",
    title: "Backend & Systems",
    description: "Spring Modulith, NestJS, gRPC, BullMQ & Redis architectures",
    icon: <Server className='h-4 w-4 text-emerald-500' />,
  },
  {
    key: "iot",
    title: "IoT & Hardware",
    description: "MQTT SSL, Raspberry Pi Python daemons, and Arduino RS485",
    icon: <Cpu className='h-4 w-4 text-amber-500' />,
  },
  {
    key: "app",
    title: "Mobile & Kiosks",
    description: "Flutter mobile apps and Electron touchscreen terminals",
    icon: <Smartphone className='h-4 w-4 text-purple-500' />,
  },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption =
    categoryOptions.find((opt) => opt.key === selectedCategory) || categoryOptions[0];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.categories.includes(selectedCategory);
    const matchesSearch =
      searchQuery.trim() === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (catKey: string) => {
    if (catKey === "all") return projects.length;

    return projects.filter((p) => p.categories.includes(catKey)).length;
  };

  return (
    <section className='w-full space-y-8 sm:space-y-10'>
      {/* Header */}
      <motion.div
        className='max-w-3xl space-y-3'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20'>
          <Sparkles className='h-3.5 w-3.5' />
          Production Projects & Architecture
        </div>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Featured Projects
        </h2>
        <p className='text-muted-foreground md:text-xl leading-relaxed'>
          Explore production architectures, distributed backends, and IoT systems. Click any card row
          to view its full technical case study.
        </p>
      </motion.div>

      {/* Filter Control Bar: Custom Select Dropdown & Search with Stacking Context (z-30) */}
      <div className='relative z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-content1 border border-default-200/80 shadow-md backdrop-blur-md'>
        {/* Custom Select Option Component */}
        <div ref={dropdownRef} className='relative z-40 flex-1 sm:max-w-xs md:max-w-sm'>
          <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
            Filter by Technology Area
          </span>
          <button
            aria-expanded={isDropdownOpen}
            aria-haspopup='listbox'
            className='w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-default-100/80 hover:bg-default-200/80 border border-default-200 text-sm font-medium transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer'
            type='button'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className='flex items-center gap-2.5 min-w-0'>
              {currentOption.icon}
              <span className='font-semibold text-foreground truncate'>{currentOption.title}</span>
              <span className='px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-semibold font-mono border border-primary/25'>
                {getCategoryCount(currentOption.key)}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu Options with solid z-50 elevated styling */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className='absolute left-0 right-0 sm:w-[320px] md:w-[350px] top-full mt-2 z-50 p-2 rounded-2xl bg-content1 border border-default-300 shadow-2xl backdrop-blur-2xl space-y-1 ring-1 ring-black/10'
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {categoryOptions.map((option) => {
                  const isSelected = selectedCategory === option.key;
                  const count = getCategoryCount(option.key);

                  return (
                    <button
                      key={option.key}
                      className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary/15 text-primary font-semibold border border-primary/30"
                          : "hover:bg-default-100 text-foreground border border-transparent"
                      }`}
                      type='button'
                      onClick={() => {
                        setSelectedCategory(option.key);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className='flex items-start gap-3 min-w-0'>
                        <div className='mt-0.5 flex-shrink-0'>{option.icon}</div>
                        <div className='space-y-0.5 min-w-0'>
                          <div className='text-sm leading-snug font-medium'>{option.title}</div>
                          <div className='text-xs text-muted-foreground line-clamp-1'>
                            {option.description}
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 flex-shrink-0'>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold font-mono ${
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-default-200/70 text-muted-foreground"
                          }`}
                        >
                          {count}
                        </span>
                        {isSelected && <Check className='h-4 w-4 text-primary' />}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Filter Input */}
        <div className='flex-1 sm:max-w-xs md:max-w-sm'>
          <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
            Search by Stack or Feature
          </span>
          <Input
            classNames={{
              inputWrapper: "h-10 bg-default-100/80 hover:bg-default-200/80 transition-colors rounded-xl",
            }}
            placeholder='Search React, Spring, MQTT...'
            size='sm'
            startContent={<Search className='h-3.5 w-3.5 text-muted-foreground mr-1.5' />}
            value={searchQuery}
            variant='flat'
            onValueChange={setSearchQuery}
          />
        </div>

        {/* Counter Info & Reset */}
        <div className='flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:pl-2'>
          <span className='text-xs font-mono text-muted-foreground'>
            Showing <strong className='text-primary'>{filteredProjects.length}</strong> of{" "}
            {projects.length}
          </span>
          {(selectedCategory !== "all" || searchQuery !== "") && (
            <Button
              className='text-xs h-7 px-2 text-muted-foreground hover:text-foreground'
              size='sm'
              variant='light'
              onPress={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Projects List — 1 Row = 1 Clickable Card (z-10) */}
      <div className='relative z-10 flex flex-col gap-6 sm:gap-8 w-full'>
        {filteredProjects.length === 0 ? (
          <div className='text-center py-16 space-y-3 bg-default-50/50 rounded-2xl border border-dashed border-default-200'>
            <SlidersHorizontal className='h-10 w-10 text-muted-foreground mx-auto' />
            <h3 className='text-lg font-semibold'>No projects found for current filter</h3>
            <p className='text-sm text-muted-foreground'>Try selecting a different category or clearing search.</p>
            <Button
              size='sm'
              variant='bordered'
              onPress={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Show All Projects
            </Button>
          </div>
        ) : (
          filteredProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              className='w-full'
              initial={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
