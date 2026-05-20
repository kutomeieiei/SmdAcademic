import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  image: string;
  cardGradient: string;
}

const slides: Slide[] = [
  {
    title: "คลังข้อสอบ",
    subtitle: "ข้อสอบเก่า สอวน. และ TCAS ครบทุกวิชา",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop",
    cardGradient:
      "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(59,130,246,0.25))",
  },
  {
    title: "เตรียมสอบ",
    subtitle: "คู่มือและสรุปเนื้อหาสำหรับสอบแข่งขัน",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    cardGradient:
      "linear-gradient(135deg, rgba(20,184,166,0.35), rgba(34,197,94,0.25))",
  },
  {
    title: "โครงงานวิทย์",
    subtitle: "ไอเดียโครงงานวิทยาศาสตร์และวิศวกรรม",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop",
    cardGradient:
      "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(139,92,246,0.25))",
  },
  {
    title: "มหาวิทยาลัย",
    subtitle: "ข้อมูลรับเข้าและคะแนนสอบมหาวิทยาลัย",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    cardGradient:
      "linear-gradient(135deg, rgba(236,72,153,0.35), rgba(139,92,246,0.25))",
  },
  {
    title: "ผลงาน",
    subtitle: "Portfolio และผลงานเด่นจากรุ่นพี่",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90910b68d?q=80&w=600&auto=format&fit=crop",
    cardGradient:
      "linear-gradient(135deg, rgba(249,115,22,0.35), rgba(236,72,153,0.25))",
  },
];

const N = slides.length;
const ANGLE_PER = 360 / N;
const RADIUS_DESKTOP = 480;
const RADIUS_MOBILE = 340;

export function ImageSlider() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const radius = isMobile ? RADIUS_MOBILE : RADIUS_DESKTOP;

  const snapToCard = useCallback(
    (angle: number, velocity: number) => {
      const len = N;
      let normalized = ((angle % 360) + 360) % 360;

      // Bias toward velocity direction
      if (velocity > 150) normalized += ANGLE_PER * 0.3;
      else if (velocity < -150) normalized -= ANGLE_PER * 0.3;

      const idx = Math.round(normalized / ANGLE_PER) % len;
      const target = idx * ANGLE_PER;

      // Keep angle continuous (avoid jumps from wrapping)
      const fullTurns = Math.round(rotation / 360) * 360;
      let final = fullTurns + target;
      // Pick the closest continuous angle
      const candidates = [
        final - 360,
        final,
        final + 360,
      ];
      final = candidates.reduce((best, c) =>
        Math.abs(c - rotation) < Math.abs(best - rotation) ? c : best,
      );

      setActiveIndex(idx);
      return final;
    },
    [rotation],
  );

  const handleDrag = useCallback((_: any, info: PanInfo) => {
    setRotation((prev) => prev + info.delta.x * 0.35);
  }, []);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const momentum = info.velocity.x * 0.6;
      const target = rotation + momentum;
      const snapped = snapToCard(target, info.velocity.x);
      setRotation(snapped);
    },
    [rotation, snapToCard],
  );

  const goNext = useCallback(() => {
    setRotation((prev) => {
      const next = prev + ANGLE_PER;
      setActiveIndex(((activeIndex + 1) % N + N) % N);
      return next;
    });
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    setRotation((prev) => {
      const next = prev - ANGLE_PER;
      setActiveIndex(((activeIndex - 1) % N + N) % N);
      return next;
    });
  }, [activeIndex]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    const target = index * ANGLE_PER;
    const fullTurns = Math.round(rotation / 360) * 360;
    let final = fullTurns + target;
    const candidates = [final - 360, final, final + 360];
    final = candidates.reduce((best, c) =>
      Math.abs(c - rotation) < Math.abs(best - rotation) ? c : best,
    );
    setRotation(final);
  }, [rotation]);

  // Auto-rotate
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setRotation((prev) => prev - 0.25);
    }, 16);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  // Update activeIndex from rotation
  useEffect(() => {
    const norm = ((rotation % 360) + 360) % 360;
    setActiveIndex(Math.round(norm / ANGLE_PER) % N);
  }, [rotation]);

  return (
    <div className="relative w-full h-[420px] sm:h-[560px] md:h-[640px] overflow-hidden rounded-3xl select-none group/carousel bg-black">
      {/* Decorative radial glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/8 blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />
      </div>

      {/* Reflection floor */}
      <div
        className="absolute bottom-0 inset-x-0 h-1/2 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
        }}
      />

      {/* 3D Cylinder Scene */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ perspective: "1100px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            width: isMobile ? "220px" : "300px",
            height: isMobile ? "300px" : "420px",
          }}
          animate={{ rotateY: rotation }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 24,
            mass: 1.2,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${i * ANGLE_PER}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Glassmorphism Card */}
              <div
                className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
                style={{
                  background: slide.cardGradient,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Image section */}
                <div className="relative h-[55%] overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Text section */}
                <div className="flex-1 flex flex-col justify-center px-4 sm:px-5 py-3 sm:py-4">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                    {slide.title}
                  </h3>
                  <p className="text-white/50 text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-2">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Glass reflection accent */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Drag layer */}
      <motion.div
        className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      />

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/8 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200 border border-white/10 opacity-0 group-hover/carousel:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/8 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200 border border-white/10 opacity-0 group-hover/carousel:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dash Pagination */}
      <div className="absolute bottom-5 sm:bottom-8 inset-x-0 z-30 flex justify-center gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ease-out ${
              activeIndex === index
                ? "w-8 sm:w-12 bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                : "w-2 sm:w-3 bg-white/20 hover:bg-white/35"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Active card indicator label */}
      <div className="absolute top-5 sm:top-7 inset-x-0 z-30 flex justify-center pointer-events-none">
        <span className="text-[10px] sm:text-xs tracking-[0.25em] text-white/30 font-mono uppercase">
          {slides[activeIndex].title} &mdash; {activeIndex + 1}/{N}
        </span>
      </div>
    </div>
  );
}
