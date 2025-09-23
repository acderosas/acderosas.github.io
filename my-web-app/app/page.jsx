// Homepage
'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import rdhomepage from "../public/RDHomePage.png";
import Fire from "./components/Fire";

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
  },

  {  
    id: "Fire",
    angle: 16,
    x: 1790, 
    y: 1110, 
    w: 280, 
    h: 160, 
    label: "Fire" 
  }

  // One for projects once I made a couple more that are MVPs

];

// Going of neocities will have a room where user can click 
// certain things: book, radio
// and will either zoom in and go to a new page or put a book 
// down on the table to view it
export default function Home() {
  const router = useRouter();

  // For debugging
  const showDebug = false; 

  const go = (href) => (e) => {
    if (e.type === 'keydown' && !(e.key === 'Enter' || e.key === ' ')) return;
    e.preventDefault();
    router.push(href);
  };

  return (
    <main className="overflow-hidden">
      <section className="relative w-full" style = {{ height: 'calc(100dvh - var(--header-h))' }}>
        <Image
          src = {rdhomepage}
          alt = ""
          fill
          priority
          className = "object-fill z-0"
          aria-hidden
        />

        <svg
          className = "absolute inset-0 w-full h-full z-10"
          viewBox = { `0 0 ${NAT_W} ${NAT_H}` }
          preserveAspectRatio = "none"
        >
          {HOTSPOTS.map((h, i) => {
            const key = h.href ?? h.id ?? String(i);
            const cx = h.x + h.w / 2;
            const cy = h.y + h.h / 2;
            const isClickable = !!h.href;

            return (
              <g
                key = { key }
                transform={h.angle != null ? `rotate(${h.angle} ${cx} ${cy})` : undefined}
              >
                <rect
                  x = { h.x }
                  y = { h.y }
                  width = { h.w }
                  height = { h.h }
                  rx = "12"
                  fill = "transparent"
                  pointerEvents = { isClickable ? "all" : "none" }
                  role = { isClickable ? "link" : undefined }
                  aria-label = { h.label }
                  tabIndex = { isClickable ? 0 : -1 }
                  onClick = { isClickable ? go(h.href) : undefined }
                  onKeyDown = { isClickable ? go(h.href) : undefined }
                  style = { { cursor: isClickable ? 'pointer' : 'default' } }
                >
                  <title>{h.label}</title>
                </rect>

                {showDebug && (
                  <rect
                    x = { h.x }
                    y = { h.y }
                    width = { h.w }
                    height = { h.h }
                    rx = "12"
                    fill = "none"
                    stroke = "rgb(52,211,153)"
                    strokeOpacity = "0.7"
                    strokeWidth = "6"
                    pointerEvents = "none"
                  />
                )}

                {h.id === 'Fire' && (
                  <foreignObject
                    x = { h.x }
                    y = { h.y }
                    width = { h.w }
                    height = { h.h }
                  >
                    <Fire style={{ width: '100%', height: '100%' }} />
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>
      </section>
    </main>
  );
}