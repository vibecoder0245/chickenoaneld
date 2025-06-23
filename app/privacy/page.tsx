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
      <>
        <p>
          Welcome to CDN Cheats ("us", "we", or "our"). This Privacy Policy explains how DZAB Softech FZCO collects,
          uses, discloses, and safeguards your information when you visit our website [Your Website URL], including any
          other media form, media channel, mobile website, or mobile application related or connected thereto
          (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of
          this privacy policy, please do not access the site.
        </p>
        <p>
          We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you
          about any changes by updating the "Last Updated" date of this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "collection-of-information",
    title: "2. Collection Of Your Information",
    content: (
      <>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site
          includes:
        </p>
        <h3>Personal Data</h3>
        <p>
          Personally identifiable information, such as your name, shipping address, email address, and telephone number,
          and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to
          us when you register with the Site or when you choose to participate in various activities related to the
          Site, such as online chat and message boards.
        </p>
        <h3>Derivative Data</h3>
        <p>
          Information our servers automatically collect when you access the Site, such as your IP address, your browser
          type, your operating system, your access times, and the pages you have viewed directly before and after
          accessing the Site.
        </p>
        <h3>Financial Data</h3>
        <p>
          Financial information, such as data related to your payment method (e.g., valid credit card number, card
          brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information
          about our services from the Site. We store only very limited, if any, financial information that we collect.
          Otherwise, all financial information is stored by our payment processor, [Name Your Payment Processor(s) -
          e.g., Stripe, PayPal], and you are encouraged to review their privacy policy and contact them directly for
          responses to your questions.
        </p>
        <h3>Data From Social Networks</h3>
        <p>
          User information from social networking sites, such as [List Social Networks, e.g., Discord, Facebook,
          Google], including your name, your social network username, location, gender, birth date, email address,
          profile picture, and public data for contacts, if you connect your account to such social networks.
        </p>
        {/* Add more data types as relevant */}
      </>
    ),
  },
  {
    id: "use-of-information",
    title: "3. Use Of Your Information",
    content: (
      <>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized
          experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
          <li>Improve the efficiency and operation of the Site.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          {/* Add more uses as relevant */}
        </ul>
      </>
    ),
  },
  {
    id: "disclosure-of-information",
    title: "4. Disclosure Of Your Information",
    content: (
      <>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed
          as follows:
        </p>
        <h3>By Law or to Protect Rights</h3>
        <p>
          If we believe the release of information about you is necessary to respond to legal process, to investigate or
          remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may
          share your information as permitted or required by any applicable law, rule, or regulation.
        </p>
        <h3>Third-Party Service Providers</h3>
        <p>
          We may share your information with third parties that perform services for us or on our behalf, including
          payment processing, data analysis, email delivery, hosting services, customer service, and marketing
          assistance.
        </p>
        {/* Add more disclosure scenarios as relevant */}
      </>
    ),
  },
  {
    id: "tracking-technologies",
    title: "5. Tracking Technologies (Cookies and Web Beacons)",
    content: (
      <>
        <p>
          We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help
          customize the Site and improve your experience. When you access the Site, your personal information is not
          collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can
          remove or reject cookies, but be aware that such action could affect the availability and functionality of the
          Site.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "6. Security Of Your Information",
    content: (
      <p>
        We use administrative, technical, and physical security measures to help protect your personal information.
        While we have taken reasonable steps to secure the personal information you provide to us, please be aware that
        despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be
        guaranteed against any interception or other type of misuse.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: (
      <p>
        We will only keep your personal information for as long as it is necessary for the purposes set out in this
        privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or
        other legal requirements).
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Rights (e.g., GDPR, CCPA)",
    content: (
      <p>
        Depending on your location, you may have certain rights under applicable data protection laws. These may include
        the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or
        erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data
        portability. In certain circumstances, you may also have the right to object to the processing of your personal
        information. To make such a request, please use the contact details provided below.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "9. Policy For Children",
    content: (
      <p>
        We do not knowingly solicit information from or market to children under the age of 13 (or higher, as per local
        regulations). If you become aware of any data we have collected from children under age 13, please contact us
        using the contact information provided below.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "10. Contact Us",
    content: (
      <p>
        If you have questions or comments about this Privacy Policy, please contact us at: [Your Contact Email from
        Legal Imprint] or via our address listed in the Legal Imprint.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <div>
      <NewHeader />
      <LegalPageLayout
        title="Privacy Policy"
        lastUpdated="June 20, 2025" //  UPDATE THIS DATE
        sections={sections}
      />
    </div>
  )
}
