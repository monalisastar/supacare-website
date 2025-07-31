export default function ContactInfo() {
  return (
    <section className="flex-1 flex flex-col gap-6">
      <h2 className="text-3xl font-semibold text-green-700">Our Location</h2>
      <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.578727600176!2d36.82194671529106!3d-1.2920651391797483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a58a8e7d29%3A0x15d226306d5c20e!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1629999999999!5m2!1sen!2sus"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="border-0"
        />
      </div>

      <div className="mt-auto space-y-2">
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:info@Supacare.com" className="text-green-600 hover:underline">
            info@Supacare.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          <a href="tel:+254720096680" className="text-green-600 hover:underline">
            +254 720 096 680
          </a>
        </p>
        <p>
          <strong>Address:</strong> 123 Eco Street, Nairobi, Kenya
        </p>
        <p>
          <strong>Hours:</strong> Mon-Fri 9am - 5pm
        </p>
      </div>
    </section>
  );
}
