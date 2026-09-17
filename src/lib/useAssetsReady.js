import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/castle-left.png",
  "/images/castle-right.png",
  "/images/nobunaga-hero.png",
];

// Maksimal nunggu sebelum maksa masuk (biar gak kejebak loader).
const MAX_WAIT = 4000;

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    // onerror tetap resolve: 1 file gagal jangan jegal semuanya.
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

async function waitFonts() {
  try {
    await Promise.race([
      (async () => {
        await document.fonts.load('700 112px "Noto Serif"');
        await document.fonts.load('400 16px "Noto Sans"');
        await document.fonts.ready;
      })(),
      new Promise((r) => setTimeout(r, MAX_WAIT)),
    ]);
  } catch {
    // Abaikan — timeout yang jaga.
  }
}

// true kalau image hero + font kritis udah siap (atau timeout / reduced-motion).
export function useAssetsReady() {
  const [ready, setReady] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
  useEffect(() => {
    if (ready) return; // reduced-motion: langsung siap dari init
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) setReady(true);
    }, MAX_WAIT);
    Promise.all([...HERO_IMAGES.map(loadImage), waitFonts()]).then(() => {
      if (!cancelled) {
        clearTimeout(timer);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ready]);
  return ready;
}
