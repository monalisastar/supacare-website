import Image from 'next/image';
import Link from 'next/link';

export const components = {
  BlogImage: ({ src, alt }: { src: string; alt: string }) => (
    <div className="my-6 rounded-xl overflow-hidden shadow-md">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="w-full object-cover rounded-xl"
      />
      {alt && <p className="text-sm text-center mt-1 text-green-800">{alt}</p>}
    </div>
  ),

  BlogQuote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-green-700 pl-4 italic text-green-900 my-6">
      {children}
    </blockquote>
  ),

  CallToAction: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <div className="bg-green-800/10 border border-green-700/30 rounded-xl p-4 my-6 text-center">
      <p className="text-green-800 mb-2">{children}</p>
      <Link
        href={href}
        className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Take Action →
      </Link>
    </div>
  ),
};
