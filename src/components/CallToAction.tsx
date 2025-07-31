type CallToActionProps = {
  title: string;
  buttonText: string;
  href: string;
};

export default function CallToAction({ title, buttonText, href }: CallToActionProps) {
  return (
    <div className="bg-green-100 border border-green-300 rounded-lg p-6 my-6 text-center">
      <h3 className="text-xl font-semibold text-green-800 mb-4">{title}</h3>
      <a
        href={href}
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {buttonText}
      </a>
    </div>
  );
}
