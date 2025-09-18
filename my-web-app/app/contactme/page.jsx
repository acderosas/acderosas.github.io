'use client';

import FlipBook from '../components/FlipBook';

const EMAIL    = 'andrederosasadr@gmail.com';
const GITHUB   = 'https://github.com/acderosas';
const LINKEDIN = 'https://linkedin.com/in/andre-de-rosas-a89044355/';
const DISCORD  = 'https://discordapp.com/users/669382053921423360';

const ContactText = (
  <section
    className="book-text"
    style={{ display: 'grid', gap: '20px' }} 
  >
    <h3 style={{ fontWeight: 700, margin: 0 }}>Contacts</h3>

    <div style={{ display: 'grid', gap: '6px' }}>
      <div style={{ fontWeight: 600 }}>Email</div>
      <a href={`mailto:${EMAIL}?subject=Hello%20Andre`}>{EMAIL}</a>
    </div>

    <div style={{ display: 'grid', gap: '6px' }}>
      <div style={{ fontWeight: 600 }}>GitHub</div>
      <a href={GITHUB} target="_blank" rel="noreferrer">
        {GITHUB}
      </a>
    </div>

    <div style={{ display: 'grid', gap: '6px' }}>
      <div style={{ fontWeight: 600 }}>LinkedIn</div>
      <a href={LINKEDIN} target="_blank" rel="noreferrer">
        {LINKEDIN}
      </a>
    </div>

    <div style={{ display: 'grid', gap: '6px' }}>
      <div style={{ fontWeight: 600 }}>Discord</div>
      <a href={DISCORD} target="_blank" rel="noreferrer">
        {DISCORD}
      </a>
    </div>
  </section>
);

const PAGES = [ContactText];

export default function ContactPage() {
  return (
    <FlipBook
      items={PAGES}
      frontTitle="Contact Me"
      theme={{
        coverBg:   'linear-gradient(135deg,#0f172a,#334155)',
        coverInk:  '#e2e8f0',
        pageBg:    '#fffdf8',
        ink:       '#1f2937',
        gutterBg:  'linear-gradient(#d6ccb9,#b8ac99)',
        accent:    '#ac6c44',
      }}
    />
  );
}
