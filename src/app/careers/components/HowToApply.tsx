// components/careers/HowToApply.tsx

export default function HowToApply() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 bg-green-50 rounded-lg border border-green-200 shadow-md">
      <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">How to Apply</h2>

      <ol className="list-decimal list-inside space-y-4 text-green-700 text-lg leading-relaxed">
        <li>
          <strong>Review Open Positions:</strong> Browse our current job openings to find the role that fits your skills and interests.
        </li>
        <li>
          <strong>Prepare Your Documents:</strong> Update your resume/CV and write a cover letter highlighting your passion for sustainability and relevant experience.
        </li>
        <li>
          <strong>Submit Your Application:</strong> Click the "Apply Now" button on the job listing or send your documents to <a href="mailto:careers@Supacare.co.ke" className="text-green-900 underline">careers@Supacare.co.ke</a>.
        </li>
        <li>
          <strong>Interview Process:</strong> Our team will review your application and contact you for interviews if shortlisted.
        </li>
        <li>
          <strong>Join Our Team:</strong> If selected, you’ll receive an offer and onboarding details to start your journey with Supacare!
        </li>
      </ol>

      <div className="mt-12 text-center">
        <a
          href="#open-positions"
          className="inline-block px-8 py-3 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          View Open Positions
        </a>
      </div>
    </section>
  );
}
