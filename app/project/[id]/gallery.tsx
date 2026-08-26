"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = images.length > 0 ? images : ["/placeholder.svg"];
  const currentImage = safeImages[activeIndex] || safeImages[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='space-y-4'>
      {/* Featured Main Image Box */}
      <Card className='relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-default-200/80 shadow-md rounded-2xl bg-zinc-950/40'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImage}
            animate={{ opacity: 1 }}
            className='relative w-full h-full'
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              fill
              priority
              alt={`${title} screenshot ${activeIndex + 1}`}
              className='object-cover sm:object-contain'
              sizes='(min-width: 1200px) 1100px, 100vw'
              src={currentImage}
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next Floating Navigation Buttons */}
        {safeImages.length > 1 && (
          <div className='absolute inset-0 flex items-center justify-between p-3 pointer-events-none'>
            <Button
              isIconOnly
              aria-label='Previous screenshot'
              className='pointer-events-auto bg-background/70 backdrop-blur-md hover:bg-background/90 text-foreground border border-default-200/50 shadow-md'
              radius='full'
              size='sm'
              onPress={handlePrev}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              isIconOnly
              aria-label='Next screenshot'
              className='pointer-events-auto bg-background/70 backdrop-blur-md hover:bg-background/90 text-foreground border border-default-200/50 shadow-md'
              radius='full'
              size='sm'
              onPress={handleNext}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}

        {/* Bottom Badge Counter */}
        {safeImages.length > 1 && (
          <div className='absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono border border-white/10'>
            {activeIndex + 1} / {safeImages.length}
          </div>
        )}
      </Card>

      {/* Thumbnail Strip */}
      {safeImages.length > 1 && (
        <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-thin'>
          {safeImages.map((img, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <button
                key={idx}
                aria-label={`View screenshot ${idx + 1}`}
                className={`relative flex-shrink-0 w-24 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/30 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-default-400"
                }`}
                type='button'
                onClick={() => setActiveIndex(idx)}
              >
                <Image
                  fill
                  alt={`${title} thumbnail ${idx + 1}`}
                  className='object-cover'
                  sizes='128px'
                  src={img}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
