// components/careers/Benefits.tsx

const benefits = [
  {
    icon: '🌿',
    title: 'Sustainable Impact',
    description: 'Contribute to meaningful environmental projects that make a difference.',
  },
  {
    icon: '💼',
    title: 'Professional Growth',
    description: 'Access to training, workshops, and career development opportunities.',
  },
  {
    icon: '🏡',
    title: 'Flexible Work',
    description: 'Options for remote work and flexible hours to balance life and work.',
  },
  {
    icon: '💚',
    title: 'Health & Wellness',
    description: 'Supportive health benefits and wellness programs for all employees.',
  },
  {
    icon: '🤝',
    title: 'Inclusive Culture',
    description: 'A welcoming environment that celebrates diversity and collaboration.',
  },
];

export default function Benefits() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">Employee Benefits & Perks</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {benefits.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="bg-green-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">{title}</h3>
            <p className="text-green-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
