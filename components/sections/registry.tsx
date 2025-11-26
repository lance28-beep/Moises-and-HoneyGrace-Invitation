"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Heart, CreditCard, Smartphone, Banknote } from "lucide-react"

const paymentMethods = [
  {
    id: "paymaya",
    label: "PayMaya",
    description: "Scan via PayMaya app",
    accent: "from-[#F9D8C2] to-[#F0A7A0]",
    Icon: CreditCard,
  },
  {
    id: "gcash",
    label: "GCash",
    description: "Instant transfer via GCash",
    accent: "from-[#B9D7F5] to-[#84AEE3]",
    Icon: Smartphone,
  },
  {
    id: "metroBank",
    label: "MetroBank",
    description: "Direct bank transfer",
    accent: "from-[#F8E1C1] to-[#E3B98A]",
    Icon: Banknote,
  },
] as const

type PaymentId = typeof paymentMethods[number]["id"]

const qrImageByMethod: Record<PaymentId, string | null> = {
  paymaya: "/QR/Maya.png",
  gcash: null,
  metroBank: null,
}

export function Registry() {
  const [activeMethod, setActiveMethod] = useState<PaymentId>("paymaya")

  const activeDetails = paymentMethods.find(method => method.id === activeMethod)

  return (
    <Section id="registry" className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20">

      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Gifts
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
          We are deeply appreciative of the prayers, love, time, and effort you’ll dedicate to joining us on our special day. 
          Should you wish to bestow us a gift, monetary gifts toward our new journey together would be greatly valued as we begin building our future.
                        .
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* <div className="relative bg-white/90 backdrop-blur-md border border-[#E7C9B1] rounded-2xl shadow-[0_12px_45px_rgba(167,130,86,0.2)] p-4 sm:p-6">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-5 sm:mb-6">
            {paymentMethods.map(({ id, label, description, accent, Icon }) => {
              const isActive = id === activeMethod
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveMethod(id)}
                  className={`relative rounded-xl border px-4 py-3 flex items-center gap-3 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isActive
                      ? "border-transparent text-[#7A4B42] shadow-lg bg-gradient-to-r " + accent
                      : "border-[#E7C9B1] bg-white hover:border-[#CFAE9C] hover:shadow-md text-[#7A4B42]/80"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold tracking-wide uppercase">{label}</p>
                    <p className="text-[11px] text-[#7A4B42]/70">{description}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {activeDetails && (
            <div className="relative bg-white rounded-2xl border border-dashed border-[#CFAE9C]/60 p-5 sm:p-6 md:p-8 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-[#CFAE9C]/40 text-xs font-semibold tracking-[0.2em] text-[#A78256] uppercase">
                {activeDetails.label}
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-56 h-56 sm:w-64 sm:h-64 border border-dashed border-[#CFAE9C]/70 rounded-2xl flex items-center justify-center bg-[#FFF7EF] relative overflow-hidden">
                  {qrImageByMethod[activeMethod] ? (
                    <Image
                      src={qrImageByMethod[activeMethod]!}
                      alt={`${activeDetails.label} QR code`}
                      fill
                      sizes="256px"
                      className="object-contain p-4"
                    />
                  ) : (
                    <span className="text-[#B28383] text-sm sm:text-base font-medium">
                      {activeDetails.label} QR Placeholder
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-[#7A4B42]/80 max-w-md">
                  Tap the buttons above to switch between QR codes. Only one payment option is shown at a time for clarity.
                </p>
              </div>
            </div>
          )}
        </div> */}

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/90 italic">
            Your thoughtful generosity means so much to us—thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}
