export default function ContactHeader() {
  return (
    <section className="bg-[#061209] min-h-[55vh] flex flex-col justify-end pb-16 pt-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
          Get in touch
        </p>
        <h1 className="text-4xl lg:text-6xl font-semibold text-white leading-tight max-w-2xl mb-5 tracking-tight">
          Let's talk.
        </h1>
        <p className="text-white/50 text-lg max-w-xl leading-relaxed">
          Whether you're interested in partnering with us, enquiring about
          carbon credits, or just want to learn more — we'd love to hear from you.
        </p>
      </div>
    </section>
  )
}
