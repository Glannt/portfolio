import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  images: string[];
}

export default function Slider({ images }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='relative w-full h-full group'>
      <div className='relative h-full w-full overflow-hidden rounded-lg'>
        <div
          className='w-full h-full transition-transform duration-500 ease-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <Image
            alt={`Slide ${currentIndex + 1}`}
            className='object-cover w-full h-full'
            height={400}
            src={images[currentIndex]}
            width={600}
          />
        </div>
      </div>

      {/* Left Arrow */}
      <button
        className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
        onClick={goToPrevious}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
        onClick={goToNext}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            className={`w-2 h-2 rounded-full ${
              currentIndex === slideIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
}
