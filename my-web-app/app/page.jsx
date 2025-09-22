// Homepage
'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import rdhomepage from "../public/RDHomePage.png";

// Dimensions of image
// Using this to help with image map: https://www.image-map.net/
const NAT_W = 2160;
const NAT_H = 1620;

// Clickable items
const HOTSPOTS = [
  { 
    href: "/radio", 
    x: 1813, 
    y: 734, 
    w: 175, 
    h: 170, 
    label: "Radio: Controll Music" 
  },

  { 
    href: "/aboutme", 
    x: 825, 
    y: 168, 
    w: 112, 
    h: 210, 
    label: "Journal: About Me" 
  },

  { 
    href: "/photoalbum", 
    x: 1050, 
    y: 450, 
    w: 100, 
    h: 229, 
    label: "Photo Album: Photos" 
  },

  { 
    href: "/techstack", 
    x: 820, 
    y: 410, 
    w: 112, 
    h: 229, 
    label: "Tech Stack Board Game: Languages, Frameworks, Frontend, etc." 
  },

  { 
    href: "/contactme", 
    x: 1160, 
    y: 470, 
    w: 112, 
    h: 229, 
    label: "Yellow Pages: Contact me" 
  },

  { 
    href: "/art", 
    x: 1030, 
    y: 730, 
    w: 112, 
    h: 229, 
    label: "Artbook: Art" 
  }

  // One for projects once I made a couple more

];

// Going of neocities will have a room where user can click 
// certain things: book, radio
// and will either zoom in and go to a new page or put a book 
// down on the table to view it
export default function Home() {
  const router = useRouter();

  // turn this on only when you’re debugging hitboxes
  const showDebug = false; // (or: process.env.NODE_ENV === 'development')

  const go = (href) => (e) => {
    if (e.type === 'keydown' && !(e.key === 'Enter' || e.key === ' ')) return;
    e.preventDefault();
    router.push(href);
  };

  return (
    <main className="overflow-hidden">
      <section className="relative w-full" style={{ height: 'calc(100dvh - var(--header-h))' }}>
        <Image
          src={rdhomepage}
          alt=""
          fill
          priority
          className="object-fill z-0"
          aria-hidden
        />

        <svg
          className="absolute inset-0 w-full h-full z-10"
          viewBox={`0 0 ${NAT_W} ${NAT_H}`}
          preserveAspectRatio="none"
        >
          {HOTSPOTS.map((h) => (
            <g key={h.href}>
              {/* The clickable area; <title> gives a native tooltip on hover/focus */}
              <rect
                x={h.x}
                y={h.y}
                width={h.w}
                height={h.h}
                rx="12"
                fill="transparent"
                pointerEvents="all"
                role="link"
                aria-label={h.label}
                tabIndex={0}
                onClick={go(h.href)}
                onKeyDown={go(h.href)}
                style={{ cursor: 'pointer' }}
              >
                <title>{h.label}</title>
              </rect>

              {/* Optional debug outline */}
              {showDebug && (
                <rect
                  x={h.x}
                  y={h.y}
                  width={h.w}
                  height={h.h}
                  rx="12"
                  fill="none"
                  stroke="rgb(52,211,153)"
                  strokeOpacity="0.7"
                  strokeWidth="6"
                  pointerEvents="none"
                />
              )}
            </g>
          ))}
        </svg>
      </section>
    </main>
  );
}