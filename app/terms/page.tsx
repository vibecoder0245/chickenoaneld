"use client"

import LegalPageLayout from "@/components/legal-page-layout"
import type { ReactNode } from "react"
import NewHeader from "@/components/new-header" // Assuming NewHeader is your standard page header

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
      <>
        <p>
          Welcome to CDN Cheats ("us", "we", or "our"). These Terms of Service govern your use of our website located at
          https://cdncheats.com (together or individually "Service") operated by DZAB Softech FZCO.
        </p>
        <p>
          Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose
          information that results from your use of our web pages.
        </p>
        <p>
          Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you
          have read and understood Agreements, and agree to be bound of them.
        </p>
        <p>
          If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let
          us know by emailing at support@cdncheats.com so we can try to find a solution. These Terms apply to all
          visitors, users and others who wish to access or use Service.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "2. User Accounts",
    content: (
      <>
        <p>
          When you create an account with us, you guarantee that you are above the age of 18 (or the age of majority in
          your jurisdiction), and that the information you provide us is accurate, complete, and current at all times.
          Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on
          Service.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your account and password, including but not
          limited to the restriction of access to your computer and/or account. You agree to accept responsibility for
          any and all activities or actions that occur under your account and/or password, whether your password is with
          our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of
          security or unauthorized use of your account.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-uses",
    title: "3. Prohibited Uses",
    content: (
      <>
        <p>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
        <ul>
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>
            For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them
            to inappropriate content or otherwise.
          </li>
          <li>
            To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail",
            "chain letter," "spam," or any other similar solicitation.
          </li>
          <li>
            To impersonate or attempt to impersonate DZAB Softech FZCO, a DZAB Softech FZCO employee, another user, or
            any other person or entity.
          </li>
          <li>
            In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or
            harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.
          </li>
          <li>
            To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as
            determined by us, may harm or offend DZAB Softech FZCO or users of Service or expose them to liability.
          </li>
        </ul>
        <p>Additionally, you agree not to:</p>
        <ul>
          <li>
            Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any
            other party’s use of Service, including their ability to engage in real time activities through Service.
          </li>
          <li>
            Use any robot, spider, or other automatic device, process, or means to access Service for any purpose,
            including monitoring or copying any of the material on Service.
          </li>
          <li>
            Use any manual process to monitor or copy any of the material on Service or for any other unauthorized
            purpose without our prior written consent.
          </li>
          <li>Use any device, software, or routine that interferes with the proper working of Service.</li>
          <li>
            Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or
            technologically harmful.
          </li>
          {/* Add more specific prohibited uses relevant to your services */}
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property",
    content: (
      <p>
        The Service and its original content (excluding Content provided by users), features and functionality are and
        will remain the exclusive property of DZAB Softech FZCO and its licensors. Service is protected by copyright,
        trademark, and other laws of both the UAE and foreign countries. Our trademarks and trade dress may not be used
        in connection with any product or service without the prior written consent of DZAB Softech FZCO.
      </p>
    ),
  },
  {
    id: "disclaimer-of-warranty",
    title: "5. Disclaimer Of Warranty",
    content: (
      <p>
        These services are provided by DZAB Softech FZCO on an "as is" and "as available" basis. DZAB Softech FZCO makes
        no representations or warranties of any kind, express or implied, as to the operation of their services, or the
        information, content or materials included therein. You expressly agree that your use of these services, their
        content, and any services or items obtained from us is at your sole risk. Neither DZAB Softech FZCO nor any
        person associated with DZAB Softech FZCO makes any warranty or representation with respect to the completeness,
        security, reliability, quality, accuracy, or availability of the services.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "6. Limitation Of Liability",
    content: (
      <p>
        Except as prohibited by law, you will hold us and our officers, directors, employees, and agents harmless for
        any indirect, punitive, special, incidental, or consequential damage, however it arises (including attorneys'
        fees and all related costs and expenses of litigation and arbitration, or at trial or on appeal, if any, whether
        or not litigation or arbitration is instituted), whether in an action of contract, negligence, or other tortious
        action, or arising out of or in connection with this agreement, including without limitation any claim for
        personal injury or property damage, arising from this agreement and any violation by you of any federal, state,
        or local laws, statutes, rules, or regulations, even if DZAB Softech FZCO has been previously advised of the
        possibility of such damage.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "7. Governing Law",
    content: (
      <p>
        These Terms shall be governed and construed in accordance with the laws of the United Arab Emirates, as
        applicable in the Emirate of Dubai, without regard to its conflict of law provisions.
      </p>
    ),
  },
  {
    id: "changes-to-service",
    title: "8. Changes To Service",
    content: (
      <p>
        We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in
        our sole discretion without notice. We will not be liable if for any reason all or any part of Service is
        unavailable at any time or for any period.
      </p>
    ),
  },
  {
    id: "amendments-to-terms",
    title: "9. Amendments To Terms",
    content: (
      <p>
        We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review
        these Terms periodically. Your continued use of the Platform following the posting of revised Terms means that
        you accept and agree to the changes. You are expected to check this page frequently so you are aware of any
        changes, as they are binding on you.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "10. Contact Us",
    content: (
      <p>Please send your feedback, comments, requests for technical support by email: support@cdncheats.com.</p>
    ),
  },
]

export default function TermsPage() {
  return (
    <div>
      <NewHeader title="Terms of Service" />
      <LegalPageLayout
        title="Terms of Service"
        lastUpdated="June 20, 2025" //  UPDATE THIS DATE
        sections={sections}
      />
    </div>
  )
}
