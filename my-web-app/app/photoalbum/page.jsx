'use client';

import FlipBook from '../components/FlipBook';

const PAGES = [
    { 
        type: 'image', 
        src: '/img1.jpg', 
        caption: 'Baby Photo' 
    },

    { 
        type: 'image', 
        src: '/img2.jpg', 
        caption: 'Kindergarten' 
    },

    { 
        type: 'image', 
        src: '/img3.jpg', 
        caption: 'Elementary' 
    },

    { 
        type: 'image', 
        src: '/img4.jpg', 
        caption: 'High School' 
    },

    { 
        type: 'image', 
        src: '/img5.jpg', 
        caption: 'Present' 
    },
];

export default function PhotoAlbumPage() {
  return (
    <FlipBook
      pages = { PAGES } 
      baseAspect = {{ w: 4, h: 3 }}
      frontTitle = "Photo Album"
      backTitle = "Back Cover"
      startOpen = { false }
      showControls = { true }
      onIndexChange = { (i) => console.log('spread index:', i) }
    />
  );
}
