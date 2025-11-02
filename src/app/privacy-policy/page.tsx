'use client'

import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] text-[#1b4332] px-6 sm:px-12 py-20">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#1b4332]">
          Privacy Policy
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          At <strong>Supacare Solutions</strong> (“we,” “our,” “us”), your privacy matters.  
          This Privacy Policy outlines how we collect, use, and protect your personal information
          when you interact with our website, services, and digital platforms.
        </p>

        {/* 🔹 Information We Collect */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">1. Information We Collect</h2>
        <p className="text-gray-700 mb-3">
          We collect personal and non-personal information to provide and improve our services:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Personal Information</strong> — such as your name, email address, phone number, and location when you contact us or subscribe to newsletters.</li>
          <li><strong>Usage Data</strong> — such as pages visited, time spent, and actions taken on our site, collected through analytics tools.</li>
          <li><strong>Device Information</strong> — such as browser type, operating system, and IP address for performance optimization and security.</li>
        </ul>

        {/* 🔹 How We Use Your Information */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-3">We use collected data to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Deliver and improve our services and customer support.</li>
          <li>Send you updates, newsletters, or marketing communications (only with consent).</li>
          <li>Analyze trends to enhance user experience and website performance.</li>
          <li>Ensure compliance with legal, safety, and operational obligations.</li>
        </ul>

        {/* 🔹 Legal Basis */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">3. Legal Basis for Processing</h2>
        <p className="text-gray-700 leading-relaxed">
          Under the General Data Protection Regulation (GDPR), we process your personal information
          on the following bases:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
          <li>Your consent (e.g., for marketing or newsletters).</li>
          <li>Performance of a contract (e.g., when providing requested services).</li>
          <li>Compliance with legal obligations.</li>
          <li>Legitimate interests (e.g., service improvement and security).</li>
        </ul>

        {/* 🔹 Sharing Information */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">4. Sharing Your Information</h2>
        <p className="text-gray-700 leading-relaxed">
          We do not sell your personal information.  
          We may share data only with:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
          <li>Service providers who assist with hosting, analytics, or communications — under confidentiality agreements.</li>
          <li>Regulatory authorities or law enforcement when legally required.</li>
          <li>Business partners in connection with joint sustainability or environmental projects, with consent.</li>
        </ul>

        {/* 🔹 Data Retention */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">5. Data Retention</h2>
        <p className="text-gray-700 leading-relaxed">
          We retain personal data only as long as necessary to fulfill the purposes outlined in this
          policy, comply with legal obligations, and resolve disputes. When no longer needed, data
          is securely deleted or anonymized.
        </p>

        {/* 🔹 Data Security */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">6. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We employ appropriate administrative, technical, and physical safeguards to protect your
          information from unauthorized access, alteration, disclosure, or destruction.  
          Despite these measures, no online platform can guarantee absolute security, but we are
          committed to continuous improvement.
        </p>

        {/* 🔹 Cookies */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">7. Cookies and Tracking</h2>
        <p className="text-gray-700 leading-relaxed">
          We use cookies and similar technologies to improve your browsing experience and analyze
          website usage. You can learn more or modify your consent through our{' '}
          <Link href="/cookie-policy" className="underline text-[#1b4332]">
            Cookie Policy
          </Link>.
        </p>

        {/* 🔹 Your Rights */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">8. Your Privacy Rights</h2>
        <p className="text-gray-700 mb-3">Depending on your location, you have rights to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Access, correct, or delete your personal data.</li>
          <li>Withdraw consent at any time for optional processing (e.g., marketing).</li>
          <li>Request a copy of your data or restrict certain processing activities.</li>
          <li>Lodge a complaint with a data protection authority if you believe your rights are violated.</li>
        </ul>

        {/* 🔹 International Transfers */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">9. International Data Transfers</h2>
        <p className="text-gray-700 leading-relaxed">
          Supacare Solutions is based in Kenya, but we may process or store data on servers located
          in other countries. When transferring data internationally, we ensure adequate protection
          consistent with applicable laws.
        </p>

        {/* 🔹 Children */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">10. Children’s Privacy</h2>
        <p className="text-gray-700 leading-relaxed">
          Our services are not directed to individuals under 16 years old. We do not knowingly collect
          personal data from minors. If we learn that a child has provided us information, we will
          promptly delete it.
        </p>

        {/* 🔹 Updates */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">11. Changes to This Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may revise this Privacy Policy periodically to reflect new laws, technologies, or
          improvements. The updated version will be posted here with a revised “Last Updated” date.
        </p>

        {/* 🔹 Contact */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">12. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions or requests regarding this Privacy Policy or our data practices,
          please reach out to:
        </p>
        <p className="mt-2">
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@supacare.com" className="underline text-[#1b4332]">
            contact@supacare.com
          </a>
          <br />
          <strong>Address:</strong> Nairobi, Kenya
        </p>

        <p className="mt-10 text-gray-500 text-sm">Last Updated: November 2025</p>

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
