// components/careers/Contact.tsx

export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 bg-green-50 rounded-lg border border-green-200 shadow-md text-center">
      <h2 className="text-4xl font-bold text-green-800 mb-6">Have Questions?</h2>
      <p className="text-green-700 mb-4">
        If you have any questions about careers at Supacare or the application process, feel free to reach out.
      </p>
      <p className="text-green-700 mb-2">
        <strong>Email:</strong>{' '}
        <a href="mailto:careers@Supacare.co.ke" className="text-green-900 underline">
          careers@Supacare.co.ke
        </a>
      </p>
      <p className="text-green-700 mb-6">
        <strong>Phone:</strong>{' '}
        <a href="tel:+254720096680" className="text-green-900 underline">
          +254 720 096 680
        </a>
      </p>
      <a
        href="/contact"
        className="inline-block px-8 py-3 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400"
      >
        Contact Support
      </a>
    </section>
  );
}
