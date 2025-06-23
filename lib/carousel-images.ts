export interface CarouselImage {
  id: string // also used as slug / key
  src: string // full-size image
  alt: string // Descriptive text for image and used as title in carousel card
  href: string // where the card should link
}

/**
 * Defines the images and links for the homepage product carousel.
 * Ensure 'href' matches the category slugs defined in lib/products.ts (e.g., /catalog/your-category-slug).
 */
export const carouselImages: CarouselImage[] = [
  {
    id: "fortnite",
    src: "/images/carousel/fortnite-hero-v2.png",
    alt: "Fortnite premium enhancements",
    href: "/catalog/fortnite",
  },
  {
    id: "rust",
    src: "/images/carousel/rust-hero-v2.png",
    alt: "Rust ultimate survival tools",
    href: "/catalog/rust",
  },
  {
    id: "call-of-duty",
    src: "/images/carousel/cod-hero-v2.png",
    alt: "Call of Duty advanced tactical gear",
    href: "/catalog/call-of-duty",
  },
  {
    id: "rainbow-six",
    src: "/images/carousel/r6-siege-x-hero-v2.png",
    alt: "Rainbow Six Siege tactical tools",
    href: "/catalog/rainbow-six",
  },
  {
    id: "spoofer",
    src: "/images/carousel/spoofer-hero-v2.png",
    alt: "Universal HWID Spoofer",
    href: "/catalog/spoofer",
  },
]
