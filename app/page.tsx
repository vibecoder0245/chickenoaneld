"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"
import { ProductCardV2 } from "@/components/product-card-v2"
import StyledBadge from "@/components/styled-badge"
import BeamsBackground from "@/components/beams-background"
import PurchaseNotification from "@/components/purchase-notification"
import { Gamepad2, Star, ArrowRight, Sparkles, Handshake, Globe, MessageCircle } from "lucide-react"
import { Target, Rocket } from "lucide-react"

import { motion } from "framer-motion"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"

const GameMarquee = dynamic(() => import("@/components/game-marquee"))
const HowItWorksSection = dynamic(() => import("@/components/how-it-works-section"))
const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"))
const ReviewSection = dynamic(() => import("@/components/review-section"))

// Updated variants for a more subtle fade-in and slide-up effect
const subtleSectionVariants = {
  hidden: { opacity: 0, y: 30 }, // Reduced y from 50 to 30
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }, // Slightly faster duration
  },
}

const partnerContainerVariants = {
  hidden: { opacity: 1 }, // Keep this as is for staggering children
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const partnerCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const partnerCtaButtonBase =
  "group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 transform hover:-translate-y-0.5 hover:shadow-xl shadow-lg w-full sm:w-auto"

export default function Home() {
  const communityFavoriteProducts = products.filter((p) =>
    ["fn-supreme", "r6-ultimate", "rust-supreme"].includes(p.slug),
  )

  const topProductSlugs = [
    "fn-supreme",
    "rust-ultimate",
    "r6-ultimate",
    "cod-bo6-blaze",
    "fn-private",
    "spoofer-temp-v2",
  ]
  const topProducts = products.filter((p) => topProductSlugs.includes(p.slug)).slice(0, 6)

  const roundedFullButtonClasses = `
   group inline-flex items-center justify-center gap-2.5 rounded-full 
   bg-brand text-white font-semibold text-sm h-11 px-7 
   border border-transparent shadow-lg shadow-brand/20 
   transition-all duration-300 ease-out-quart 
   hover:bg-brand/90 hover:shadow-brand/30 hover:scale-[1.02] 
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70
 `
  const newHeroButtonBase = `
   relative group inline-flex items-center justify-center gap-2.5 
   rounded-full text-white font-semibold text-sm h-11 px-7 
   border border-transparent shadow-lg shadow-brand/20 
   transition-all duration-300 ease-out-quart 
   hover:shadow-brand/30 hover:scale-[1.02] 
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70
   overflow-hidden 
 `

  const partners = [
    {
      name: "Choppa Accounts",
      logo: "/images/logos/choppa-logo.png", // Updated Choppa Logo
      description: "Your go-to store for premium Fortnite accounts. Rust & R6 Siege accounts coming soon!",
      websiteUrl: "https://choppas-accounts.sellhub.cx/",
      discordUrl: "https://discord.gg/choppasmarketplace",
      isComingSoon: false,
      highlightColor: "bg-amber-500",
      websiteButtonColor: "bg-amber-500 hover:bg-amber-600 focus-visible:ring-amber-400",
      discordButtonColor: "bg-brand hover:bg-brand/90 focus-visible:ring-brand",
      gameIcons: [
        { src: "/images/icons/fortnite-game-icon.png", alt: "Fortnite" },
        { src: "/images/icons/rust-game-icon.png", alt: "Rust" },
        { src: "/images/icons/r6s-game-icon.webp", alt: "Rainbow Six Siege" },
      ],
    },
    {
      name: "CDN DMA",
      logo: "/images/logos/cdn-dma-logo.jpg", // Updated CDN DMA Logo
      description: "Cutting-edge DMA hardware solutions. Stay tuned for our upcoming launch!",
      websiteUrl: null,
      discordUrl: null,
      isComingSoon: true,
      highlightColor: "bg-sky-500",
      gameIcons: [
        // Added game icons for CDN DMA
        { src: "/images/icons/fortnite-game-icon.png", alt: "Fortnite Compatible" },
        { src: "/images/icons/rust-game-icon.png", alt: "Rust Compatible" },
        { src: "/images/icons/r6s-game-icon.webp", alt: "Rainbow Six Siege Compatible" },
      ],
    },
  ]

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden bg-transparent">
      <BeamsBackground intensity="medium" />
      <div className="relative z-0 flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Hero Section */}
          <motion.section
            className="relative px-4 pt-28 pb-12 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
            initial="hidden"
            animate="visible"
            variants={subtleSectionVariants}
          >
            <div className="max-w-3xl mx-auto w-full">
              <motion.h1
                className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight 
                          text-transparent bg-clip-text bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400
                          dark:from-white dark:via-gray-300 dark:to-gray-500 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  textShadow: `
                   0 0 8px rgba(0, 115, 222, 0.3), 
                   0 0 15px rgba(0, 115, 222, 0.2),
                   0 0 25px rgba(0, 115, 222, 0.1)
                 `,
                }}
              >
                Unleash Your Potential.
              </motion.h1>
              <motion.p
                className="text-sm sm:text-base md:text-lg text-foreground/70 mt-4 mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Premium game enhancements for the competitive edge. Discover top-tier cheats for your favorite titles.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center"
              >
                <Link href="/catalog/all" className={cn(newHeroButtonBase)}>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br 
                              from-brand-light via-brand to-brand-light 
                              group-hover:from-brand group-hover:via-brand-dark group-hover:to-brand
                              transition-colors duration-300 ease-out-quart"
                  ></span>
                  <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Explore Products</span>
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Game Selection Section (with GameMarquee) */}
          <motion.section
            id="game-selection-wrapper"
            className="py-12 md:py-16 bg-transparent"
            initial="hidden"
            whileInView="visible"
            variants={subtleSectionVariants}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-2 mb-10 md:mb-16 text-center">
                <div className="relative mb-2">
                  <div className="absolute h-full w-full bg-brand opacity-10 blur-[10px]"></div>
                  <div className="whitespace-nowrap border-transparent inline-flex items-center rounded-md border px-2 py-1 text-sm transition-colors duration-200 bg-brand/10 text-brand shadow hover:bg-brand/20 w-fit gap-1.5">
                    <Gamepad2 className="h-4 w-4" />
                    Games
                  </div>
                </div>
                <div className="relative py-2">
                  <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                    Extensive Game Selection
                  </h2>
                  <span
                    className={cn(
                      "absolute -top-1 sm:-top-1.5 md:-top-2 lg:-top-2.5 left-1/2 -translate-x-1/2",
                      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                      "font-bold text-white/5 select-none pointer-events-none whitespace-nowrap -z-0",
                      "tracking-tight",
                    )}
                    aria-hidden="true"
                  >
                    Extensive Game Selection
                  </span>
                </div>
                <p className="max-w-xl text-xs sm:text-sm text-neutral-400 mt-2">
                  Select the game you are looking for from our wide variety of supported titles.
                </p>
              </div>
              <GameMarquee />
              <div className="flex items-center justify-center mt-12 md:mt-16">
                <Link href="/catalog/all" className={cn(roundedFullButtonClasses)}>
                  <Gamepad2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  View All Products
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Top Products Section */}
          <motion.section
            className="py-16 md:py-24 bg-transparent"
            initial="hidden"
            whileInView="visible"
            variants={subtleSectionVariants}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
                <StyledBadge
                  text="Top Products"
                  icon={Star}
                  className="mb-4 border-amber-500/50 text-amber-400 bg-amber-500/10"
                  blurColorClass="bg-amber-500"
                  iconClassName="text-amber-400"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                  Handpicked Top Sellers
                </h2>
                <p className="text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
                  Explore our most sought-after products, trusted by gamers for their performance and reliability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {topProducts.map((product) => (
                  <ProductCardV2 product={product} key={product.id} />
                ))}
              </div>

              <div className="flex justify-center mt-12 md:mt-16">
                <Link href="/catalog/all" className={cn(roundedFullButtonClasses)}>
                  Explore All Products
                  <ArrowRight className="ml-1.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.section>

          <HowItWorksSection />

          {/* Enhanced Partners Section */}
          <motion.section
            id="partners-section"
            className="py-16 md:py-24 bg-transparent"
            initial="hidden"
            whileInView="visible"
            variants={subtleSectionVariants}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 md:mb-16">
                <StyledBadge
                  text="Collaborations"
                  icon={Handshake}
                  className="mb-4 border-purple-500/50 text-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                  blurColorClass="bg-purple-500"
                  iconClassName="text-purple-400"
                />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Our Valued Partners</h2>
                <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
                  We team up with industry leaders to enhance your gaming experience and provide exclusive offers.
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
                variants={partnerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {partners.map((partner) => (
                  <motion.div
                    key={partner.name}
                    className="group relative flex flex-col rounded-xl border border-slate-800 bg-neutral-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:border-brand/50 hover:shadow-brand/20 hover:bg-neutral-800/70 overflow-hidden"
                    variants={partnerCardVariants}
                  >
                    <div
                      className={cn(
                        "absolute top-0 left-0 h-1 w-full opacity-70 group-hover:opacity-100 transition-opacity",
                        partner.highlightColor,
                      )}
                    ></div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 border-slate-700/80 group-hover:border-brand/70 transition-colors shrink-0">
                        <Image
                          src={partner.logo || "/placeholder.svg?width=96&height=96&query=Partner+Logo"}
                          alt={`${partner.name} logo`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">{partner.name}</h3>
                        {partner.isComingSoon && (
                          <StyledBadge
                            text="Coming Soon"
                            className="border-teal-500/50 text-teal-400 bg-teal-500/20 text-xs py-0.5 px-2 mb-2 inline-block"
                            blurColorClass="bg-teal-600"
                          />
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 mb-4 flex-grow min-h-[50px] text-center sm:text-left">
                      {partner.description}
                    </p>

                    {partner.gameIcons && partner.gameIcons.length > 0 && (
                      <div className="mb-6 text-center sm:text-left">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                          {partner.name === "CDN DMA" ? "Compatible With" : "Accounts For"}
                        </h4>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          {partner.gameIcons.map((icon, index) => (
                            <div
                              key={index}
                              title={icon.alt}
                              className="relative h-8 w-8 p-1 bg-slate-700/50 rounded-md transition-all duration-200 hover:bg-slate-700/80 hover:scale-110"
                            >
                              <Image
                                src={icon.src || "/placeholder.svg?width=32&height=32&query=Game+Icon"}
                                alt={icon.alt}
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 mt-auto w-full items-center justify-center sm:justify-start">
                      {partner.websiteUrl && partner.websiteButtonColor && (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(partnerCtaButtonBase, partner.websiteButtonColor)}
                          aria-label={`${partner.name} Website`}
                        >
                          <Globe className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
                          Visit Store
                        </a>
                      )}
                      {partner.discordUrl && partner.discordButtonColor && (
                        <a
                          href={partner.discordUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(partnerCtaButtonBase, partner.discordButtonColor)}
                          aria-label={`${partner.name} Discord`}
                        >
                          <MessageCircle className="w-4 h-4 mr-1.5 group-hover:rotate-12 transition-transform" />
                          Join Discord
                        </a>
                      )}
                      {!partner.websiteUrl && !partner.discordUrl && partner.isComingSoon && (
                        <p className="text-sm text-slate-500 italic">Links coming soon...</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={subtleSectionVariants}
            viewport={{ once: true, amount: 0.1 }}
            className="bg-transparent"
          >
            <WhyChooseUs />
          </motion.div>

          {/* Community Favorites Section */}
          <motion.section
            className="py-20 px-4 md:px-6 lg:px-8 bg-transparent"
            initial="hidden"
            whileInView="visible"
            variants={subtleSectionVariants}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="max-w-7xl mx-auto relative">
              <div className="flex flex-col items-center mb-12 text-center">
                <StyledBadge
                  text="Top Picks"
                  icon={Target}
                  className="mb-4 border-brand/50 text-brand bg-brand/10"
                  blurColorClass="bg-brand"
                  iconClassName="text-brand"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Community Favorites</h2>
                <p className="text-sm sm:text-base text-foreground/70 max-w-2xl">
                  Discover the cheats our community trusts and loves for an unbeatable edge.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {communityFavoriteProducts.map((product) => (
                  <ProductCardV2 product={product} key={product.id} />
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Link href="/catalog/all" className={cn(roundedFullButtonClasses)}>
                  View All Products{" "}
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={subtleSectionVariants}
            viewport={{ once: true, amount: 0.1 }}
            className="bg-transparent"
          >
            <ReviewSection />
          </motion.div>

          {/* Final CTA Section */}
          <motion.section
            className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-transparent relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            variants={subtleSectionVariants}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-radial from-brand/5 via-transparent to-transparent opacity-50 blur-3xl"></div>
            </div>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <StyledBadge
                  text="Your Next Level Awaits"
                  icon={Rocket}
                  className="mb-6 border-brand/60 text-brand bg-brand/15 shadow-lg shadow-brand/20"
                  blurColorClass="bg-brand"
                  iconClassName="text-brand"
                />
              </motion.div>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ textShadow: "0 2px 20px rgba(0, 115, 222, 0.3)" }}
              >
                Ready to Elevate Your Gaming?
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-foreground/70 mb-10 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Join thousands of satisfied gamers who have transformed their gaming experience with CDN Cheats.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <Link href="/catalog/all" className={cn(roundedFullButtonClasses)}>
                  <Rocket className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Get Started Today
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </main>
        <PurchaseNotification />
      </div>
    </div>
  )
}
