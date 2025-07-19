// components/careers/JobList.tsx

type Job = {
  id: string;
  title: string;
  location: string;
  type: string; // e.g. Full-time, Internship
  description: string;
  applyLink: string;
};

const jobs: Job[] = [
  {
    id: '1',
    title: 'Sustainability Analyst',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description:
      'Support carbon advisory projects and help develop sustainability reports for our clients.',
    applyLink: '#apply',
  },
  {
    id: '2',
    title: 'Field Technician - Waste Management',
    location: 'Kisumu, Kenya',
    type: 'Full-time',
    description:
      'Assist with the installation and maintenance of IoT-enabled waste tracking devices in the field.',
    applyLink: '#apply',
  },
  {
    id: '3',
    title: 'Community Outreach Coordinator',
    location: 'Remote',
    type: 'Part-time',
    description:
      'Lead local workshops and community engagement on clean cooking solutions and carbon reduction.',
    applyLink: '#apply',
  },
];

export default function JobList() {
  return (
    <section
      id="open-positions"
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <h2 className="text-4xl font-bold text-green-800 mb-10 text-center">Open Positions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(({ id, title, location, type, description, applyLink }) => (
          <article
            key={id}
            className="bg-green-50 rounded-lg border border-green-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-green-900 mb-2">{title}</h3>
            <p className="text-green-700 mb-1">
              <strong>Location:</strong> {location}
            </p>
            <p className="text-green-700 mb-3">
              <strong>Type:</strong> {type}
            </p>
            <p className="text-green-800 mb-6 text-sm">{description}</p>
            <a
              href={applyLink}
              className="inline-block px-5 py-2 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Apply Now
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
