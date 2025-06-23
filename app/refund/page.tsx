"use client"

import LegalPageLayout from "@/components/legal-page-layout"
import type { ReactNode } from "react"
import NewHeader from "@/components/new-header"

interface Section {
  id: string
  title: string
  content: ReactNode
}

const sections: Section[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <p>
        Thank you for shopping at CDN Cheats, operated by DZAB Softech FZCO. We want to ensure you are satisfied with
        your purchase. This policy outlines the conditions under which refunds may be granted.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "2. Eligibility for Refunds",
    content: (
      <>
        <p>
          Due to the digital nature of our products (software, licenses, digital services), refunds are generally not
          provided once a product has been delivered, accessed, or used, unless otherwise specified below or required by
          applicable law.
        </p>
        <p>A refund may be considered under the following circumstances:</p>
        <ul>
          <li>
            <strong>Non-Delivery of Product:</strong> If you do not receive the digital product within a reasonable
            timeframe after purchase confirmation.
          </li>
          <li>
            <strong>Major Defects:</strong> If the product is materially defective and unusable, and we are unable to
            provide a fix or a working alternative within a reasonable timeframe. You must provide detailed information
            and evidence (e.g., screenshots, error logs) of the defect.
          </li>
          <li>
            <strong>Misrepresentation:</strong> If the product was significantly misrepresented in its description on
            our website.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "non-refundable",
    title: "3. Non-Refundable Items/Services",
    content: (
      <>
        <p>The following items or services are generally non-refundable:</p>
        <ul>
          <li>Products that have been successfully delivered and activated/used.</li>
          <li>Subscription renewals, unless cancelled before the renewal date as per subscription terms.</li>
          <li>Products purchased during promotional or sale periods, if explicitly stated.</li>
          <li>Services that have already been rendered.</li>
        </ul>
      </>
    ),
  },
  {
    id: "request-process",
    title: "4. Process for Requesting a Refund",
    content: (
      <>
        <p>
          To request a refund, please contact our support team at support@cdncheats.com within 14 days of your purchase.
        </p>
        <p>Your request must include:</p>
        <ul>
          <li>Your order number or proof of purchase.</li>
          <li>A detailed explanation of the reason for your refund request.</li>
          <li>Any supporting evidence (e.g., screenshots, error messages).</li>
        </ul>
        <p>
          We will review your request and notify you of the approval or rejection of your refund within a reasonable
          timeframe.
        </p>
      </>
    ),
  },
  {
    id: "processing-time",
    title: "5. Processing Time",
    content: (
      <p>
        If your refund is approved, it will be processed, and a credit will automatically be applied to your original
        method of payment, within 1-5 business days. Please note that it may take some additional time for your bank or
        credit card company to process and post the refund.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "6. Disputes",
    content: (
      <p>
        If you have any concerns or disputes about a charge, please contact us directly first to resolve the issue.
        Initiating a chargeback or payment dispute with your bank or payment processor without first contacting us may
        result in the suspension or termination of your account and access to our services.
      </p>
    ),
  },
  {
    id: "changes-to-policy",
    title: "7. Changes to This Refund Policy",
    content: (
      <p>
        We reserve the right to modify this Refund Policy at any time. Any changes will be effective immediately upon
        posting the updated policy on our website. Your continued use of our services after any such changes constitutes
        your acceptance of the new Refund Policy.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "8. Contact Us",
    content: <p>If you have any questions about our Refund Policy, please contact us at: support@cdncheats.com.</p>,
  },
]

export default function RefundPage() {
  return (
    <div>
      <NewHeader />
      <LegalPageLayout
        title="Refund Policy"
        lastUpdated="June 20, 2025" //  UPDATE THIS DATE
        sections={sections}
      />
    </div>
  )
}
