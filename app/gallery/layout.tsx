"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Simple top bar with only Back link - beige motif */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#F4F1EA]/95 border-b border-[#CBB9A3]/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#7E6153] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-[#7E6153]/30 bg-[#CBB9A3]/50 hover:bg-[#CBB9A3]/70 hover:border-[#7E6153]/50 transition-all duration-200 font-sans text-sm sm:text-base"
          >
            <span className="text-base sm:text-lg">←</span>
            <span className="hidden xs:inline">Back to main page</span>
            <span className="xs:hidden">Back</span>
          </Link>
          <div className="text-xs sm:text-sm text-[#7E6153]/70 font-sans font-medium">Gallery</div>
        </div>
      </div>
      {children}
    </div>
  )
}






