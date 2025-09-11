"use client";

import { useState } from "react";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const shareTo = (platform: "facebook" | "twitter" | "linkedin") => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`;
        break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3 mt-6">
      <button
        onClick={() => shareTo("facebook")}
        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        <Facebook size={18} />
      </button>
      <button
        onClick={() => shareTo("twitter")}
        className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition"
      >
        <Twitter size={18} />
      </button>
      <button
        onClick={() => shareTo("linkedin")}
        className="p-2 rounded-full bg-blue-800 hover:bg-blue-900 text-white transition"
      >
        <Linkedin size={18} />
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-800 text-white transition flex items-center justify-center"
      >
        {copied ? <Check size={18} /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}
