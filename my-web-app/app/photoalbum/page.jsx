'use client';
import FlipBook from '../components/FlipBook';

const ITEMS = [
  { src: '/img1.jpg', text: 'Baby Photo'}, // make only this one shorter
  { src: '/img2.jpg', text: 'Kindergarten' },
  { src: '/img3.jpg', text: 'Elementary' },
  { src: '/img4.jpg', text: 'High School' },
  { src: '/img5.jpg', text: 'Present' },
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
      frontTitle="Photo Album"
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
