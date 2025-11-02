"use client"

import { useEffect } from "react"


export default function ClientHydration() {
  useEffect(() => {
    // ✅ Lazy-load all non-critical images
    const images = document.querySelectorAll("img:not([loading])")
    images.forEach((img) => {
      img.setAttribute("loading", "lazy")
      img.setAttribute("decoding", "async")
    })

    // ✅ Lazy-load all non-preloaded videos
    const videos = document.querySelectorAll("video:not([preload])")
    videos.forEach((video) => {
      video.setAttribute("preload", "metadata")
    })

    // ✅ Prevent double execution in strict mode
    return () => {
      // Cleanup (not strictly needed, but good practice)
    }
  }, [])

  // ✅ No visible UI; runs silently
  return null
}
