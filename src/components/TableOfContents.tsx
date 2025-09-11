"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: React.ReactNode }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLElement[];

    const mapped = elements.map((el) => ({
      id: el.id || el.innerText.toLowerCase().replace(/\s+/g, "-"),
      text: el.innerText,
      level: el.tagName === "H2" ? 2 : 3,
    }));

    mapped.forEach((h, i) => {
      if (!elements[i].id) elements[i].id = h.id;
    });

    setHeadings(mapped);

    const onScroll = () => {
      let currentId = "";
      for (const h of mapped) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 3) {
          currentId = h.id;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!headings.length) return null;

  return (
    <aside
      className="
        mb-12 bg-white shadow rounded-2xl
        md:sticky md:top-24 md:self-start md:w-72 md:mr-8
      "
    >
      {/* Header with toggle button (mobile) */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-green-900 flex items-center gap-2">
          <List size={18} /> Table of Contents
        </h2>
        <button
          className="md:hidden flex items-center gap-1 text-sm text-green-700 hover:text-green-900"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <>
              Hide <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {/* TOC list */}
      <AnimatePresence initial={false}>
        {(open || (typeof window !== "undefined" && window.innerWidth >= 768)) && (
          <motion.ul
            key="toc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 text-sm p-4"
          >
            {headings.map((h) => (
              <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                <a
                  href={`#${h.id}`}
                  className={`block transition-colors ${
                    activeId === h.id
                      ? "text-green-700 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </aside>
  );
}
