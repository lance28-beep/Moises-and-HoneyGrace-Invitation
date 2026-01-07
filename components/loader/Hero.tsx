import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
  '/desktop-background/couple (1).webp',
  '/desktop-background/couple (2).webp',
  '/desktop-background/couple (3).webp',
  '/desktop-background/couple (4).webp',
  '/desktop-background/couple (5).webp',
];

const mobileImages: string[] = [
  '/mobile-background/couple (1).webp',
  '/mobile-background/couple (2).webp',
  '/mobile-background/couple (3).webp',
  '/mobile-background/couple (4).webp',
  '/mobile-background/couple (5).webp',
  '/mobile-background/couple (6).webp',
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted || images.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted, images.length]);

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
            src={src}
            alt="Couple"
              fill
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              quality={85}
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: 'rgba(244, 241, 234, 0.7)'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div className="mb-auto mt-8">
          <div className="relative flex items-center justify-center">
            {/* Circle Container */}
            <div 
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#FAF9F5'
              }}
            >
              {/* Monogram Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                <Image
                  src="/monogram/monogram.png"
                  alt="Moises & Honey Grace Monogram"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-4 pb-14 sm:pb-16 md:pb-20">
          <h2
            className="text-6xl md:text-8xl transform -rotate-6"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: '#A38D78',
            }}
          >
            You are
          </h2>
          
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wider uppercase"
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#A38D78',
            }}
          >
            INVITED
          </h1>

          <button 
            onClick={() => {
              onOpen();
            }}
            className="px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-sm hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#A38D78',
              color: '#FFFFFF',
            }}
          >
            <span
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 500, color: '#FFFFFF' }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};