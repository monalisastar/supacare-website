'use client';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton() {
  const whatsappLink =
    'https://wa.me/254720096680?text=Hello%20Supacare!%20I%20would%20like%20to%20learn%20more%20about%20your%20products%20and%20services.';

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-110 z-50 w-14 h-14 items-center justify-center animate-fade-in"
    >
      <MessageCircle size={28} />
    </a>
  );
}
