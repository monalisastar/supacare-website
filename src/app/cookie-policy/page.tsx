'use client'

import Link from 'next/link'

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] text-[#1b4332] px-6 sm:px-12 py-20">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#1b4332]">
          Cookie Policy
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          This Cookie Policy explains how <strong>Supacare Solutions</strong> (“we,” “our,” “us”)
          uses cookies and similar technologies to recognize you when you visit our website.
          It describes what these technologies are, why we use them, and your rights to control
          their use.
        </p>

        {/* 🔹 What Are Cookies */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">1. What Are Cookies?</h2>
        <p className="text-gray-700 leading-relaxed">
          Cookies are small data files placed on your device when you visit a website. They are
          widely used to make websites work, or work more efficiently, as well as to provide
          information to the site owners. Cookies may be “session cookies” (deleted when you close
          your browser) or “persistent cookies” (stored until they expire or are deleted).
        </p>

        {/* 🔹 How We Use Cookies */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">2. How We Use Cookies</h2>
        <p className="text-gray-700 mb-3">
          We use cookies to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Enable core functionality such as page navigation and security.</li>
          <li>Improve your browsing experience by remembering preferences.</li>
          <li>Analyze traffic and user behavior to enhance performance.</li>
          <li>Provide relevant content and measure marketing effectiveness.</li>
        </ul>

        {/* 🔹 Types of Cookies */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">3. Types of Cookies We Use</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>
            <strong>Essential Cookies</strong> – Required for the website to function properly.
            They include features like login, cart persistence, and security. These cannot be disabled.
          </li>
          <li>
            <strong>Analytics Cookies</strong> – Help us understand how visitors interact with the site
            by collecting anonymous data (e.g., pages visited, time spent). Examples include Google Analytics or Plausible.
          </li>
          <li>
            <strong>Preference Cookies</strong> – Remember your choices such as language or region
            to provide a personalized experience.
          </li>
          <li>
            <strong>Marketing Cookies</strong> – Used to display relevant ads or measure campaign performance.
            These may be set by third-party advertising platforms.
          </li>
        </ul>

        {/* 🔹 Managing Cookies */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">4. Managing Your Cookie Preferences</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          You can manage or withdraw your consent at any time using the “Manage Cookies” option
          in our website footer. You can also configure your browser to block or delete cookies.
          However, disabling essential cookies may affect website functionality.
        </p>
        <p className="text-gray-700">
          For step-by-step instructions on how to control cookies in popular browsers, visit:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-2">
          <li>
            <a href="https://support.google.com/chrome/answer/95647" className="text-[#1b4332] underline" target="_blank">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-[#1b4332] underline" target="_blank">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-[#1b4332] underline" target="_blank">
              Safari
            </a>
          </li>
          <li>
            <a href="https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" className="text-[#1b4332] underline" target="_blank">
              Microsoft Edge
            </a>
          </li>
        </ul>

        {/* 🔹 Third Party Cookies */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">5. Third-Party Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          Some cookies on our website are set by third parties to deliver analytics or marketing
          services. These include tools like Google Analytics, YouTube embeds, or social media
          integrations. We do not control these cookies, and we recommend reviewing the privacy
          policies of these third parties for more information.
        </p>

        {/* 🔹 Updates */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">6. Updates to This Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Cookie Policy periodically to reflect changes in our practices or
          for other operational, legal, or regulatory reasons. The updated version will always be
          available on this page, and the “Last Updated” date will be revised accordingly.
        </p>

        {/* 🔹 Contact */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">7. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about this Cookie Policy or our data practices, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@supacare.com" className="underline text-[#1b4332]">
            contact@supacare.com
          </a>
          <br />
          <strong>Address:</strong> Nairobi, Kenya
        </p>

        <p className="mt-10 text-gray-500 text-sm">
          Last Updated: November 2025
        </p>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-block bg-[#1b4332] text-white px-6 py-3 rounded-lg hover:bg-[#145a3f]"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
