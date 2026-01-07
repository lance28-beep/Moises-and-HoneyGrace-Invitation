"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export function Welcome() {
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom
  return (
    <Section
      id="welcome"
      className="relative overflow-hidden bg-transparent py-12 sm:py-16 md:py-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] border border-[#F1EDE2]/80 bg-[#F1EDE2]/98 backdrop-blur-2xl shadow-[0_16px_60px_rgba(241,237,226,0.4)] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
          {/* Layered glass + light accents for readability */}
          <div className="pointer-events-none absolute inset-0">
            {/* Solid primary background with slight transparency */}
            <div
              className="absolute inset-0 opacity-95"
              style={{
                backgroundColor: "rgba(241, 237, 226, 0.98)",
              }}
            />
            {/* Subtle radial highlights */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(169,134,52,0.15),transparent_60%)] opacity-70" />
            <div className="absolute bottom-[-6rem] right-[-2rem] w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(126,97,83,0.12),transparent_60%)] opacity-75" />
            {/* Inner border glow */}
            <div className="absolute inset-[1px] rounded-[inherit] border border-[#D8B0B0]/40" />
          </div>

          <div className="relative text-center space-y-6 sm:space-y-7 md:space-y-8">
          {/* Main heading */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <p
              className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#7E6153]`}
              style={{ textShadow: "0 1px 8px rgba(126,97,83,0.4)" }}
            >
              {brideName} &amp; {groomName}
            </p>
            <h2
              className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] text-[#7E6153]"
              style={{ textShadow: "0 3px 14px rgba(126,97,83,0.5)" }}
            >
              Welcome to our wedding website
            </h2>


            {/* Verse */}
            <div className="space-y-1">
              <p
                className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#7E6153]/90 italic`}
                style={{ textShadow: "0 1px 8px rgba(126,97,83,0.3)" }}
              >
                &quot;Love is patient, love is kind. It does not envy, it does not boast, it is not proud… It always protects, always trusts, always hopes, always perseveres.&quot;
              </p>
              <p
                className={`${cormorant.className} text-[0.65rem] sm:text-xs md:text-sm text-[#7E6153]/80 tracking-[0.2em] uppercase`}
                style={{ textShadow: "0 1px 6px rgba(126,97,83,0.3)" }}
              >
                1 Corinthians 13:4–7 (NIV)
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="h-px w-10 sm:w-16 md:w-20 bg-[#7E6153]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#A98634] shadow-[0_0_14px_rgba(169,134,52,0.8)]" />
              <span className="h-px w-10 sm:w-16 md:w-20 bg-[#7E6153]/40" />
            </div>
          </div>

          {/* Body text */}
          <div
            className={`${cormorant.className} text-[0.85rem] sm:text-sm md:text-base leading-relaxed sm:leading-7 text-[#7E6153] space-y-3 sm:space-y-4`}
          >
            <p>
              We are overjoyed to share this special moment with you as we begin our journey together as one. 
              Your presence in our lives has been a gift, and having you celebrate with us makes this day even more meaningful.
            </p>
            <p>
              This website contains all the details you&apos;ll need — from our story and ceremony information to 
              travel details and our registry. We&apos;ve created it with love, hoping it helps you feel prepared 
              and excited to be part of our celebration.
            </p>
            <p>
              Thank you for being part of our lives and for joining us as we take this beautiful step forward together.
            </p>
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


