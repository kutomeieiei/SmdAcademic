import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
    title: "Technology & Engineering",
    subtitle: "แหล่งรวมความรู้และผลงานด้านวิศวกรรมคอมพิวเตอร์",
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    title: "Study & Exams",
    subtitle: "คลังข้อสอบเก่าและสรุปเนื้อหาสำหรับเตรียมตัวสอบ",
  },
  {
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
    title: "Science Projects",
    subtitle: "โครงงานและการทดลองทางวิทยาศาสตร์",
  },
];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />{" "}
          {/* Overlay overlay for better text readability */}
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 sm:p-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight"
            >
              {images[currentIndex].title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl font-light"
            >
              {images[currentIndex].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 sm:px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-30 flex justify-center gap-2 sm:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-white"
                : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
