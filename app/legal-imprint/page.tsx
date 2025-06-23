"use client"

import LegalPageLayout from "@/components/legal-page-layout"
import type { ReactNode } from "react"
import Image from "next/image" // For the flag

interface Section {
  id: string
  title: string
  content: ReactNode
}

const sections: Section[] = [
  {
    id: "provider-information",
    title: "Provider Information (Impressum)",
    content: (
      <>
        <p>Information according to § 5 TMG (German Telemedia Act) or equivalent local regulations.</p>
        <p className="font-semibold mt-4">DZAB Softech FZCO</p>
        <p>A1-34523-001, DDP Building A1</p>
        <p>Digital Park, Dubai Silicon Oasis</p>
        <p>Industrial Area, Dubai</p>
        <p className="flex items-center">
          United Arab Emirates
          <Image
            src="/images/ae.png" // Ensure this path is correct
            alt="UAE Flag"
            width={20}
            height={14}
            className="ml-2 inline-block"
          />
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    content: (
      <>
        <p>
          <strong>Email:</strong> support@cdncheats.com
        </p>
        <p>
          <strong>Website:</strong> https://cdncheats.com
        </p>
      </>
    ),
  },
  {
    id: "registration-details",
    title: "Company Registration Details",
    content: (
      <>
        <p>
          <strong>Company Name:</strong> DZAB Softech FZCO
        </p>
        <p>
          <strong>Legal Form:</strong> Free Zone Company (FZCO)
        </p>
        <p>
          <strong>Registered Address:</strong> A1-34523-001, DDP Building A1, Digital Park, Dubai Silicon Oasis,
          Industrial Area, Dubai, UAE
        </p>
        {/* Commercial License Number and Issuing Authority removed */}
      </>
    ),
  },
  // VAT Information section is entirely removed
  {
    id: "responsible-for-content",
    title: "Responsible for Content",
    content: <p>Michael Sailor, Managing Director, Address as above.</p>,
  },
  {
    id: "dispute-resolution",
    title: "Online Dispute Resolution",
    content: (
      <>
        <p>
          The European Commission provides a platform for online dispute resolution (OS):{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>
          We are not obliged or willing to participate in dispute resolution proceedings before a consumer arbitration
          board.
        </p>
        <p>
          For disputes arising from our services within the UAE, resolution may be sought through the relevant Dubai
          courts or arbitration centers as per applicable laws.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    content: (
      <>
        <h3>Accountability for content</h3>
        <p>
          The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents'
          accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for
          our own content on these web pages. In this matter, please note that we are not obliged to monitor the
          transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity.
        </p>
        <h3>Accountability for links</h3>
        <p>
          Responsibility for the content of external links (to web pages of third parties) lies solely with the
          operators of the linked pages. No violations were evident to us at the time of linking. Should any legal
          infringement become known to us, we will remove the respective link immediately.
        </p>
        <h3>Copyright</h3>
        <p>
          Our web pages and their contents are subject to UAE copyright law unless otherwise stated. Unless expressly
          permitted by law, every form of utilizing, reproducing or processing works subject to copyright protection on
          our web pages requires the prior consent of the respective owner of the rights.
        </p>
      </>
    ),
  },
]

export default function LegalImprintPage() {
  return (
    <LegalPageLayout
      title="Legal Imprint"
      lastUpdated="June 20, 2025" //  UPDATE THIS DATE
      sections={sections}
    />
  )
}
