type BlogQuoteProps = {
  children: React.ReactNode;
};

export default function BlogQuote({ children }: BlogQuoteProps) {
  return (
    <blockquote className="border-l-4 border-green-600 pl-4 italic text-green-800 my-6">
      {children}
    </blockquote>
  );
}
