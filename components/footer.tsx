import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react" // Removed Mail icon

const productLinks = [
  { name: "Fortnite Cheats", href: "/catalog/fortnite" },
  { name: "Rust Cheats", href: "/catalog/rust" },
  { name: "R6 Cheats", href: "/catalog/rainbow-six" },
  { name: "COD Cheats", href: "/catalog/call-of-duty" },
  { name: "Spoofers", href: "/catalog/spoofer" },
  { name: "All Products", href: "/catalog/all" },
]

// A thinner, more subtle gradient divider
const GradientDivider = () => <div className="w-10 h-px bg-gradient-to-r from-brand to-transparent mb-3 mt-1" />

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Logo and Company Info - Increased prominence */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo/cdn-logo-new-blue.png"
                alt="CDN Cheats Logo"
                width={160}
                height={42}
                className="h-auto"
              />
            </Link>
            <p className="text-sm max-w-sm mb-6 leading-relaxed">
              Elevate your gameplay with premium, undetected cheats and HWID spoofers. Join thousands of satisfied
              gamers worldwide.
            </p>
            <div className="space-y-3.5 text-sm">
              <p className="font-medium text-neutral-200">Achiva NV</p>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 shrink-0 text-neutral-500" />
                <span className="flex items-center">
                  Jan Noorduynweg 48B, Willemstad, Curacao
                  <Image
                    src="/images/flags/curacao-flag-emoji.png" // Updated image source
                    alt="Curacao Flag"
                    width={18} // Kept original size, can be adjusted
                    height={12} // Kept original size, can be adjusted
                    className="ml-2 inline-block align-middle shrink-0"
                  />
                </span>
              </div>
              {/* Removed Contact via Legal Imprint section */}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-semibold text-neutral-300 tracking-wider uppercase">Products</h3>
              <GradientDivider />
              <ul className="space-y-2.5">
                {productLinks.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm hover:text-brand transition-colors duration-200">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-neutral-300 tracking-wider uppercase">Resources</h3>
              <GradientDivider />
              <ul className="space-y-2.5">
                <li>
                  <Link href="/status" className="text-sm hover:text-brand transition-colors duration-200">
                    Service Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.gg/cdnontop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-brand transition-colors duration-200"
                  >
                    Discord Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-neutral-300 tracking-wider uppercase">Legal</h3>
              <GradientDivider />
              <ul className="space-y-2.5">
                <li>
                  <Link href="/terms" className="text-sm hover:text-brand transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm hover:text-brand transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-sm hover:text-brand transition-colors duration-200">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal-imprint" className="text-sm hover:text-brand transition-colors duration-200">
                    Legal Imprint
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Achiva NV (Operating as CDN Cheats). All rights reserved.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center mt-6 text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Disclaimer: Products are intended for educational and research purposes only. Any misuse may violate game
          terms of service. Achiva NV is not affiliated with any game developers or publishers.
        </p>
      </div>
    </footer>
  )
}
