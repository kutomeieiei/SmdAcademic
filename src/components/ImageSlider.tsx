import React, { useState, useEffect } from "react";
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
  {
    url: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
    title: "Arts & Humanities",
    subtitle: "รวมผลงานศิลปะและการออกแบบเชิงสร้างสรรค์",
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    title: "Medical Sciences",
    subtitle: "สรุปชีววิทยาและเทคนิคการแพทย์",
  }
];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const getPositionClass = (index: number) => {
    const diff = (index - currentIndex + images.length) % images.length;
    
    if (diff === 0) {
      // Center
      return "z-30 translate-x-0 scale-100 opacity-100 brightness-100";
    } else if (diff === 1 || diff === -(images.length - 1)) {
      // Right
      return "z-20 translate-x-[40%] sm:translate-x-[60%] scale-[0.8] sm:scale-[0.85] opacity-60 brightness-75 cursor-pointer";
    } else if (diff === images.length - 1 || diff === -1) {
      // Left
      return "z-20 -translate-x-[40%] sm:-translate-x-[60%] scale-[0.8] sm:scale-[0.85] opacity-60 brightness-75 cursor-pointer";
    } else {
      // Hidden behind
      return "z-10 translate-x-0 scale-50 opacity-0 brightness-50";
    }
  };

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex flex-col items-center justify-center overflow-hidden py-8 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-[800px] h-[300px] sm:h-[400px] md:h-[480px] flex items-center justify-center">
        {images.map((img, index) => {
          const isCenter = index === currentIndex;
          const diff = (index - currentIndex + images.length) % images.length;
          
          return (
            <div
              key={index}
              onClick={() => {
                if (diff === 1 || diff === -(images.length - 1)) nextSlide();
                if (diff === images.length - 1 || diff === -1) prevSlide();
              }}
              className={`absolute top-1/2 -translate-y-1/2 w-[85%] sm:w-[70%] aspect-[4/3] rounded-none overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl ${getPositionClass(index)}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" /> 
              {/* Overlay overlay for better text readability */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 z-20 flex flex-col items-center justify-end text-center p-6 sm:p-12 transition-opacity duration-500 ${isCenter ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight drop-shadow-md">
                  {img.title}
                </h3>
                <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl font-medium drop-shadow-sm">
                  {img.subtitle}
                </p>
                {isCenter && (
                  <button className="mt-6 px-6 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-semibold transition-all border border-white/30">
                    Learn more
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 border border-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} className="sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 border border-white/10"
          aria-label="Next slide"
        >
          <ChevronRight size={28} className="sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Dots */}
      <div className="z-30 flex justify-center gap-2 sm:gap-3 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              currentIndex === index
                ? "w-8 sm:w-12 h-2 sm:h-2 bg-neutral-800 dark:bg-white"
                : "w-2 sm:w-3 h-2 sm:h-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
