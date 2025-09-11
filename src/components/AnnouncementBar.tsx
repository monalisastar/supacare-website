'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Announcement = {
  message: string;
  link?: string;
  phone?: string;
  email?: string;
};

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  // Remember dismissal
  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed) setIsVisible(false);
  }, []);

  // Use static/fallback announcement
  useEffect(() => {
    const fallbackAnnouncement: Announcement = {
      message:
        '📩 Contact us for direct consultancy: virginia.njat@gmail.com | 📞 0720096680',
      link: undefined,
      phone: '0720096680',
      email: 'virginia.njat@gmail.com',
    };

    setAnnouncement(fallbackAnnouncement);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcementDismissed', 'true');
  };

  if (!announcement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-blue-600 text-white px-4 py-2 flex justify-center items-center gap-4 fixed top-0 left-0 z-50 shadow-md"
        >
          <span>{announcement.message}</span>
          <button
            onClick={handleDismiss}
            className="ml-4 font-bold text-lg hover:text-gray-300"
            aria-label="Dismiss announcement"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
