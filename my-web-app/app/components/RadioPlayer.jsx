// Radio that plays when users navigate thru the site, shouldn't refresh

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function RadioPlayer({
  playlistUrl = 'https://api.soundcloud.com/playlists/2077573953',
  color = '#ac6c44',
}) {
  const pathname = usePathname();
  const drawerRef = useRef(null);

  // Only seen in /radio, but never unmount the iframe.
  const isRadioRoute = pathname === '/radio';

  useEffect(() => {
    if (!drawerRef.current) return;
    drawerRef.current.classList.toggle('open', isRadioRoute);
  }, [isRadioRoute]);

  // Autoplay enabled
  const iframeSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    playlistUrl
  )}&color=${encodeURIComponent(color)}&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;

  return (
    <div
      id = "bottomplayer"
      ref = { drawerRef }
      role = "region"
      aria-label = "Radio player"
      aria-hidden = { isRadioRoute ? 'false' : 'true' }
    >
      <iframe
        allow = "autoplay"
        src = {iframeSrc}
        title = "Radio Player"
      />
    </div>
  );
}
