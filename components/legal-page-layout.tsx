"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface Section {
  id: string
  title: string
  content: ReactNode
}

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  sections: Section[]
}

export default function LegalPageLayout({ title, lastUpdated, sections }: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for better accuracy
      let currentSection = ""

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section.id
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections, activeSection])

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{title}</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                On this page
              </h3>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className={cn(
                          "block text-sm transition-colors duration-200",
                          activeSection === section.id
                            ? "text-brand font-semibold"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-3" ref={contentRef}>
            <div className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-a:text-brand hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl text-foreground">{section.title}</h2>
                  {section.content}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
