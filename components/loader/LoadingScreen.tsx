import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Plain emerald motif background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #327B72 0%, #187153 50%, #327B72 100%)'
        }}
      />

      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Monogram Logo */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-28 sm:w-40 h-28 sm:h-40">
            <Image
              src="/monogram/monograam.png"
              alt="Nathaniel & Jasmin Monogram"
              fill
              className="object-contain"
              priority
              style={{
                filter: "brightness(0) saturate(100%) invert(88%) sepia(15%) saturate(1200%) hue-rotate(5deg) brightness(110%) contrast(95%) drop-shadow(0 0 6px rgba(248, 228, 139, 0.5)) drop-shadow(0 0 12px rgba(248, 228, 139, 0.35)) drop-shadow(0 0 18px rgba(248, 228, 139, 0.25))",
              }}
            />
            {/* Subtle gold glow behind monogram */}
            <div className="absolute inset-0 blur-2xl bg-[#F8E48B]/15 -z-10 scale-125" />
          </div>
        </div>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-white/40" />
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/40" />
          <div className="w-16 sm:w-24 h-px bg-white/40" />
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/40" />
          <div className="w-8 sm:w-12 h-px bg-white/40" />
        </div>

        {/* Content section */}
        <div className="text-center max-w-sm sm:max-w-2xl px-4 sm:px-6">
          {/* Message */}
          <p
            className="text-xs sm:text-sm leading-relaxed sm:leading-loose tracking-wide text-white/90 mb-4 sm:mb-6 italic"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300 }}
          >
            Please wait a moment while we set the scene,
            <br />
            <span className="text-white/80 text-[10px] sm:text-xs">tune the music, and open the doors to celebrate</span>
            <br />
            <span className="text-white/95 text-sm sm:text-base not-italic font-normal">love, life, and forever.</span>
          </p>

          {/* Simple divider */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-4 sm:my-6">
            <div className="w-6 sm:w-8 h-px bg-white/30" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-white/40" />
            <div className="w-12 sm:w-16 h-px bg-white/40" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-white/40" />
            <div className="w-6 sm:w-8 h-px bg-white/30" />
          </div>

          {/* Loading text */}
          <p
            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/95 mb-2 sm:mb-3"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 600 }}
          >
            Loading Invitation
          </p>

          {/* Couple names */}
          <p
            className="text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.15em] text-white/90 mb-4 sm:mb-6"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400 }}
          >
            Nathaniel & Jasmin
          </p>

          {/* Progress bar */}
          <div className="relative w-48 sm:w-64 h-0.5 mx-auto bg-white/20 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-white/60 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress percentage */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.2em] text-white/50 mt-2 sm:mt-3"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300 }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};