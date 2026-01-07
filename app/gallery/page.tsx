import fs from "fs/promises"
import path from "path"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F4F1EA] via-[#FAF9F5] to-[#F4F1EA] relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#CBB9A3]/70 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#7E6153]/70" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#CBB9A3]/70 to-transparent" />
          </div>
          
          <h1
            className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#7E6153] mb-2 sm:mb-3 md:mb-4"
            style={{ textShadow: "0 4px 18px rgba(126,97,83,0.4)" }}
          >
            Our Love Story Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#7E6153]/90 font-light max-w-xl mx-auto leading-relaxed px-2">
            Every photograph tells a story of {coupleDisplayName}'s journey to forever
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#CBB9A3]/70 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#7E6153]/70" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#CBB9A3]/70 to-transparent" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#7E6153]/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#CBB9A3]/30 rounded border border-[#7E6153]/30 text-[#7E6153]">
                public/desktop-background
              </code>{" "}
              or{" "}
              <code className="px-2 py-1 bg-[#CBB9A3]/30 rounded border border-[#7E6153]/30 text-[#7E6153]">
                public/mobile-background
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}


      </section>
    </main>
  )
}


