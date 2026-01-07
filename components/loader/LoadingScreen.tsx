import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

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
        return prev + 1.25;
      });
    }, 100);

    // Simulate loading time - 8 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 8000);

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
      {/* Warm color background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #99796D 0%, #A38D78 50%, #99796D 100%)'
        }}
      />

      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Couple Image */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-48 sm:w-64 h-48 sm:h-64 md:w-80 md:h-80">
            <Image
              src="/Details/couple.png"
              alt="Couple"
              fill
              className="object-contain"
              priority
              style={{
                filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
              }}
            />
            {/* Subtle white glow behind image */}
            <div className="absolute inset-0 blur-2xl bg-white/15 -z-10 scale-125" />
          </div>
        </div>

        {/* Content section */}
        <div className="text-center max-w-sm sm:max-w-2xl px-4 sm:px-6">
          {/* Message */}
          <p
            className="text-sm sm:text-base leading-relaxed sm:leading-loose tracking-wide text-white/95 mb-6 sm:mb-8"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300 }}
          >
            Preparing our celebration for you.
            <br />
            <span className="text-white/90">Please wait as we set the scene for this special moment.</span>
          </p>


          {/* Loading text */}
          <p
            className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-white/90 mb-2 sm:mb-3"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400 }}
          >
            Loading invitation
          </p>

          {/* Couple names */}
          <p
            className="text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.15em] text-white/90 mb-4 sm:mb-6"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400 }}
          >
            {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
          </p>

          {/* Progress bar */}
          <div className="relative w-48 sm:w-64 h-0.5 mx-auto bg-white/20 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-white/60 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};