"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Users, Award, HeartHandshake } from "lucide-react" // Added HeartHandshake
import StyledBadge from "./styled-badge" // Import StyledBadge

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-400" />,
    title: "Undetected & Secure",
    description:
      "Our cheats are rigorously tested to ensure maximum safety and undetectability, keeping your account secure.",
    delay: 0.1,
  },
  {
    icon: <Zap className="w-10 h-10 text-purple-400" />,
    title: "Peak Performance",
    description: "Experience lightning-fast performance and unparalleled accuracy with our optimized cheat engine.",
    delay: 0.2,
  },
  {
    icon: <Users className="w-10 h-10 text-green-400" />, // Changed icon for 24/7 Support
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you with any queries or issues.",
    delay: 0.3,
  },
  {
    icon: <Award className="w-10 h-10 text-yellow-400" />, // Changed icon for Easy to Use
    title: "Easy To Use",
    description: "User-friendly interface and simple setup process, making it easy for anyone to get started quickly.",
    delay: 0.4,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-background/80 dark:bg-neutral-950/80 backdrop-blur-md relative">
      <div className="absolute inset-0 opacity-50 dark:opacity-30 pointer-events-none">
        {/* Subtle background pattern or gradient if desired */}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <StyledBadge
            text="Our Commitment"
            icon={HeartHandshake}
            className="mb-4 border-green-500/50 text-green-400 bg-green-500/10"
            blurColorClass="bg-green-500"
            iconClassName="text-green-400"
          />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose CDN Cheats?</h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
            We are dedicated to providing the most reliable, high-performance, and secure gaming enhancements on the
            market.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="bg-card dark:bg-neutral-900/60 border border-border dark:border-neutral-800/70 rounded-xl p-6 shadow-lg hover:shadow-brand-blue/20 dark:hover:shadow-brand-blue/30 transition-all duration-300 ease-out-quart transform hover:-translate-y-1 group"
              custom={feature.delay}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="flex justify-center mb-5 text-brand-blue group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-foreground dark:text-slate-100">
                {feature.title}
              </h3>
              <p className="text-sm text-foreground/70 dark:text-slate-400 text-center leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
