"use client"

import { motion } from "framer-motion"

const BeamSectionDivider = () => {
  return (
    <motion.div
      className="h-16 md:h-20 w-full pointer-events-none relative overflow-hidden" // Reduced height
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0, delay: 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Subtle central line/glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-px w-3/4 md:w-2/3 lg:w-1/2 opacity-50" // Thin line
          style={{
            // Using a very subtle gradient that mimics a line and blends with dark backgrounds
            background: "linear-gradient(to right, transparent, rgba(100, 116, 139, 0.2) 50%, transparent)", // slate-500 at 20% opacity
          }}
        />
      </div>
      {/* Blending with page background - kept subtle */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-background via-background/80 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
    </motion.div>
  )
}

export default BeamSectionDivider
