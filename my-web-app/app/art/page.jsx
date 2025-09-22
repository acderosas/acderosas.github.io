'use client';
import FlipBook from '../components/FlipBook';

const ITEMS = [
  { src: '/Art1.jpeg', text: 'Self Portrait'}, // make only this one shorter
  { src: '/Art2.jpeg', text: 'Corpus' },
  { src: '/Art3.jpeg', text: 'Messi Portrait' },
  { src: '/Art4.jpeg', text: 'Ronaldo Portrait' },
  { src: '/Art5.jpeg', text: 'Bro Lifting' },
  { src: '/Art6.jpeg', text: 'Car Custom Stamp' },
  { src: '/Art7.jpeg', text: 'Church on the Hill' },
];

const PAGES = ITEMS.map((it, i) => (
    <div>
    <figure
      className="polaroid-photo push-down"
      // shorter frame for compact items; others stay 4/3
      style={{ ['--photo-ar']: it.compact ? '16 / 11' : '4 / 3' }}
    >
      <img
        src={it.src}
        alt={it.text}
        className="polaroid-img"
      />
    </figure>
    <figcaption className="polaroid-cap">{it.text}</figcaption>
    </div>
));

export default function PhotoAlbum() {
  return (
    <FlipBook
      items={PAGES}
      baseAspect={{ w: 4, h: 3 }}
      frontTitle="Artbook"
      theme={{
        bookBg:    '#f1ede6',                                 
        coverBg:   'linear-gradient(135deg,#0f172a,#334155)', 
        coverInk:  '#e2e8f0',
        pageBg:    '#fffaf0',                                 
        ink:       '#1f2937',                                 
        gutterBg:  'linear-gradient(#c8bca4,#a79a83)',
        endpaperBg:'#f3efe6',                                 
        accent:    '#ac6c44',
      }}
    />
  );
}
