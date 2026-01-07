"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import Image from "next/image"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"

export function CoupleVideo() {
  // State to track if user has clicked to play the video
  const [hasClicked, setHasClicked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { pauseMusic, resumeMusic } = useAudio()

  // Video source
  const videoSrc = "/Details/SAVEME DEC05prenup.mov"

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      pauseMusic()
    }

    const handlePause = () => {
      resumeMusic()
    }

    const handleEnded = () => {
      // Video will loop automatically due to loop attribute
      // But we can ensure it restarts smoothly
      if (video.loop) {
        video.currentTime = 0
        video.play()
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [hasClicked, pauseMusic, resumeMusic])

  // Handle thumbnail click - show video with autoplay
  const handleThumbnailClick = () => {
    setHasClicked(true)
    // Pause music immediately when user clicks
    pauseMusic()
    
    // Play video after a short delay to ensure it's ready
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error)
        })
      }
    }, 100)
  }

  return (
    <>
      {/* Global styles for video player */}
      <style jsx global>{`
        .video-player-wrapper video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Custom video controls styling */
        .video-player-wrapper video::-webkit-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .video-player-wrapper video::-webkit-media-controls-play-button {
          background-color: rgba(126, 97, 83, 0.8);
          border-radius: 50%;
        }
        
        .video-player-wrapper video::-webkit-media-controls-current-time-display,
        .video-player-wrapper video::-webkit-media-controls-time-remaining-display {
          color: rgba(203, 185, 163, 0.9);
        }
        
        .video-player-wrapper video::-webkit-media-controls-timeline {
          background-color: rgba(203, 185, 163, 0.3);
        }
        
        .video-player-wrapper video::-webkit-media-controls-volume-slider {
          background-color: rgba(203, 185, 163, 0.3);
        }
        
        .video-player-wrapper video::-webkit-media-controls-mute-button {
          background-color: rgba(126, 97, 83, 0.6);
        }
        
        .video-player-wrapper video::-webkit-media-controls-fullscreen-button {
          background-color: rgba(126, 97, 83, 0.6);
        }
      `}</style>
      
      <Section
        id="couple-video"
        className="relative bg-gradient-to-b from-[#F4F1EA] via-[#FAF9F5] to-[#F4F1EA] py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden"
      >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background image */}
        <img
          src="/Details/Beige Forest Wallpaper.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: "rgba(244, 241, 234, 0.7)" }}
        />
      </div>

      {/* Header - compact, with updated title */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        {/* Simple decorative dots */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CBB9A3]/70 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#7E6153]/70" />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CBB9A3]/70 to-transparent" />
        </div>
        
        <h2 
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#7E6153] mb-2"
          style={{ textShadow: "0 4px 18px rgba(126,97,83,0.4)" }}
        >
          Save the Date
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-[#7E6153]/90 font-light max-w-xl mx-auto px-2">
          A special moment captured just for you
        </p>
      </div>

      {/* Video Container */}
      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Enhanced layered shadow effects for depth */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#7E6153]/20 via-[#CBB9A3]/15 to-[#7E6153]/20 blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-500" />
            <div className="absolute -inset-4 bg-black/25 blur-3xl opacity-45 group-hover:opacity-65 transition-all duration-500" />
            
            {/* Elegant video frame with rounded corners and enhanced shadows */}
            <div className="relative bg-gradient-to-br from-black via-[#1a0010] to-black overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_16px_64px_rgba(0,0,0,0.35),0_0_0_1px_rgba(126,97,83,0.2)] group-hover:shadow-[0_14px_52px_rgba(0,0,0,0.5),0_26px_100px_rgba(0,0,0,0.4),0_0_0_1px_rgba(126,97,83,0.3)] transition-all duration-500">
              {/* Decorative border with gradient */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-[#CBB9A3]/30 group-hover:border-[#CBB9A3]/50 transition-colors duration-500 pointer-events-none z-20" />
              
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none z-10" />
              
              {/* Elegant corner accents - top left */}
              <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
              </div>
              
              {/* Elegant corner accents - top right */}
              <div className="absolute top-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
              </div>
              
              {/* Elegant corner accents - bottom left */}
              <div className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
              </div>
              
              {/* Elegant corner accents - bottom right */}
              <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-[#CBB9A3]/60 via-[#CBB9A3]/40 to-transparent" />
              </div>
              
              {/* Video wrapper with increased height */}
              <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
                
                {/* Custom Thumbnail - shown before user clicks */}
                {!hasClicked && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 cursor-pointer z-20 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
                    onClick={handleThumbnailClick}
                  >
                    {/* Custom poster image */}
                    <Image
                      src="/mobile-background/couple (2).webp"
                      alt="Video thumbnail"
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    
                    {/* Enhanced gradient overlay for better depth and play button visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35 group-hover:from-black/70 group-hover:via-black/35 group-hover:to-black/45 transition-all duration-300" />
                    
                    {/* Inner shadow for depth */}
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
                    
                    {/* Custom Play Button with enhanced shadows */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        {/* Glow effect behind button */}
                        <div className="absolute inset-0 rounded-full bg-[#7E6153]/45 blur-2xl scale-150 group-hover:bg-[#CBB9A3]/55 group-hover:scale-[1.7] transition-all duration-300" />
                        
                        {/* Play button */}
                        <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.25),0_0_0_1px_rgba(126,97,83,0.2)] group-hover:bg-white group-hover:shadow-[0_12px_52px_rgba(0,0,0,0.5),0_24px_72px_rgba(126,97,83,0.35),0_0_0_1px_rgba(126,97,83,0.3)] transition-all duration-300">
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#7E6153] fill-[#7E6153] ml-1 drop-shadow-md" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {/* Video player - only shown after user clicks */}
                {hasClicked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 video-player-wrapper"
                  >
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      loop
                      playsInline
                      controls
                      className="absolute inset-0 w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl"
                      preload="metadata"
                      style={{ objectFit: 'cover' }}
                    >
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Subtle overlay for better visual integration */}
                    <div 
                      className="absolute inset-0 pointer-events-none z-[5] rounded-lg sm:rounded-xl md:rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.02) 100%)',
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Simple caption below video */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mt-8 sm:mt-10"
          >
            <p className="text-xs sm:text-sm md:text-base text-[#7E6153]/80 font-light italic max-w-lg mx-auto px-4">
              Mark your calendar and join us for our special day
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
    </>
  )
}

