'use client'

import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] text-[#1b4332] px-6 sm:px-12 py-20">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#1b4332]">
          Terms of Service
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          Welcome to <strong>Supacare Solutions</strong> (“we,” “our,” “us”).  
          These Terms of Service (“Terms”) govern your access to and use of our website,
          products, and services. By accessing or using our site, you agree to comply with these
          Terms. Please read them carefully before continuing to use our services.
        </p>

        {/* 🔹 Acceptance */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing or using the Supacare website or any of our services, you confirm that you
          have read, understood, and agree to be bound by these Terms and our associated
          <Link href="/privacy-policy" className="underline text-[#1b4332] ml-1">
            Privacy Policy
          </Link>.
          If you do not agree, you must discontinue use of our website immediately.
        </p>

        {/* 🔹 Eligibility */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">2. Eligibility</h2>
        <p className="text-gray-700 leading-relaxed">
          You must be at least 18 years old (or the age of legal majority in your jurisdiction) to
          use our services. By using the site, you represent that you meet this requirement and have
          the legal authority to accept these Terms on your own behalf or on behalf of an
          organization.
        </p>

        {/* 🔹 Use of Services */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">3. Use of Our Services</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Use our website only for lawful purposes and in accordance with these Terms.</li>
          <li>Do not misuse or interfere with our platform, including attempting unauthorized access.</li>
          <li>Do not upload or transmit malicious code, spam, or any harmful materials.</li>
          <li>Do not impersonate any person or misrepresent your affiliation with Supacare.</li>
        </ul>

        {/* 🔹 Accounts */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">4. Accounts and Subscriptions</h2>
        <p className="text-gray-700 leading-relaxed">
          Certain features or services may require you to create an account.  
          You are responsible for maintaining the confidentiality of your login credentials and
          for all activities under your account. Supacare reserves the right to suspend or terminate
          accounts that violate these Terms or applicable laws.
        </p>

        {/* 🔹 Intellectual Property */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">5. Intellectual Property</h2>
        <p className="text-gray-700 leading-relaxed">
          All content on this website — including text, images, graphics, videos, trademarks, and
          logos — is the property of Supacare Solutions or its licensors.  
          You may not reproduce, distribute, modify, or use our materials without prior written
          permission.
        </p>

        {/* 🔹 User Content */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">6. User-Generated Content</h2>
        <p className="text-gray-700 leading-relaxed">
          If you submit any content (such as reviews, comments, or uploads), you grant Supacare
          Solutions a non-exclusive, royalty-free, worldwide license to use, display, and distribute
          that content in connection with our services.  
          You must ensure your submissions do not infringe on others’ rights or contain unlawful
          material.
        </p>

        {/* 🔹 Third-Party Links */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">7. Third-Party Links</h2>
        <p className="text-gray-700 leading-relaxed">
          Our website may contain links to third-party websites or resources.  
          We are not responsible for the content, policies, or practices of these third-party sites.
          Accessing them is at your own risk.
        </p>

        {/* 🔹 Disclaimer */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">8. Disclaimer of Warranties</h2>
        <p className="text-gray-700 leading-relaxed">
          Our website and services are provided on an “as is” and “as available” basis.  
          Supacare Solutions makes no warranties, express or implied, regarding the reliability,
          accuracy, or availability of our site or services.  
          We do not guarantee uninterrupted or error-free operation.
        </p>

        {/* 🔹 Limitation of Liability */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">9. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          To the maximum extent permitted by law, Supacare Solutions, its officers, employees, and
          affiliates shall not be liable for any indirect, incidental, special, or consequential
          damages resulting from your use of our website or services, even if advised of such
          damages in advance.
        </p>

        {/* 🔹 Indemnification */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">10. Indemnification</h2>
        <p className="text-gray-700 leading-relaxed">
          You agree to indemnify and hold harmless Supacare Solutions and its affiliates from any
          claims, losses, damages, or expenses (including legal fees) arising from your violation of
          these Terms or misuse of our services.
        </p>

        {/* 🔹 Termination */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">11. Termination</h2>
        <p className="text-gray-700 leading-relaxed">
          We may suspend or terminate your access to our website at any time, without notice, if you
          breach these Terms or engage in any conduct that we deem harmful to Supacare or its users.
        </p>

        {/* 🔹 Governing Law */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">12. Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms are governed by and construed in accordance with the laws of the Republic of
          Kenya. Any disputes arising under or in connection with these Terms shall be subject to
          the exclusive jurisdiction of the Kenyan courts.
        </p>

        {/* 🔹 Changes to Terms */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">13. Changes to These Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          Supacare Solutions reserves the right to modify or update these Terms at any time.
          Updates will be posted on this page with a revised “Last Updated” date.  
          Continued use of our website after such changes constitutes acceptance of the updated Terms.
        </p>

        {/* 🔹 Contact */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">14. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          For any questions about these Terms of Service, please contact us at:
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
