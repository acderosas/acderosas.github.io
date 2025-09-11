// Flipbook with variable amount of pages that contain images or text

'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// As in when book is open and there are two pages shown
function toSpreads(pages) {
  const spreads = [];
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push([pages[i], pages[i + 1] ?? null]); 
  }
  return spreads;
}

/**
 * FlipBook:
 * pages: Array<Page>
 * baseAspect: { w: number, h: number } | 'auto' | undefined
 * frontTitle: string
 * backTitle: string
 * startOpen: boolean  (default false -> front cover)
 * showControls: boolean (default true)
 * onIndexChange: (index: number) => void
 */
export default function FlipBook({
  pages,
  baseAspect = 'auto',
  frontTitle = 'Photo Album',
  backTitle = 'Back Cover',
  startOpen = false,
  showControls = true,
  onIndexChange,
}) {
  const spreads = useMemo(() => toSpreads(pages), [pages]);
  const lastIndex = spreads.length; // Back cover index
  const [idx, setIdx] = useState(startOpen ? 0 : -1); // -1 = front cover

  // Images all have same aspect ratio
  const { arW, arH } = useMemo(() => {
    if (baseAspect && baseAspect !== 'auto') {
      return { arW: baseAspect.w, arH: baseAspect.h };
    }

    const firstImg = pages.find(p => p?.type === 'image' && p?.src && typeof p.src === 'object');
    if (firstImg?.src?.width && firstImg?.src?.height) {
      return { arW: firstImg.src.width, arH: firstImg.src.height };
    }
    // Default aspect ratio
    return { arW: 4, arH: 3 };
  }, [pages, baseAspect]);

  const atFront = idx === -1;
  const atBack = idx === lastIndex;
  const isOpen = idx >= 0 && idx < lastIndex;

  const goNext = useCallback(() => {
    setIdx(i => Math.min(i + 1, lastIndex));
  }, [lastIndex]);

  const goPrev = useCallback(() => {
    setIdx(i => Math.max(i - 1, -1));
  }, []);

  const goFront = useCallback(() => setIdx(-1), []);
  const openBook = useCallback(() => setIdx(0), []);

  useEffect(() => {
    onIndexChange?.(idx);
  }, [idx, onIndexChange]);

  // Can also use keyboard to move pages
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') {
        if (!atBack) goNext();
      } else if (e.key === 'ArrowLeft') {
        if (!atFront) goPrev();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, atFront, atBack]);

  return (
    <div className = "flipbook-shell">
      <div className = { `book ${isOpen ? 'book--open' : 'book--closed'}` }>
        {/*FRONT COVER*/}
        {atFront && (
          <div className="cover cover--front">
            <h2> { frontTitle } </h2>
          </div>
        )}

        {/*SPREAD*/}
        {isOpen && (
          <SpreadView
            spread = { spreads[idx] }
            arW = { arW }
            arH = { arH }
          />
        )}

        {/*BACK COVER*/}
        {atBack && (
          <div className = "cover cover--back">
            <h2>{backTitle}</h2>
          </div>
        )}
      </div>

      {showControls && (
        <div className="book-controls">
          <button
            className = "btn"
            onClick = { goPrev }
            disabled = { atFront }
            aria-disabled = { atFront }
            aria-label = "Back"
          >
            Back
          </button>

          {isOpen ? (
            <button
              className = "btn btn--secondary"
              onClick = { goFront }
              aria-label="Close book and go back to front cover"
            >
              Close book
            </button>
          ) : atBack ? (
            <button
              className = "btn btn--secondary"
              onClick = { goFront }
              aria-label = "Go to front cover"
            >
              Front cover
            </button>
          ) : (
            <button
              className = "btn btn--primary"
              onClick = { openBook }
              disabled = { atBack }
              aria-disabled = { atBack }
              aria-label = "Open book"
            >
              Open
            </button>
          )}

          <button
            className = "btn"
            onClick = { goNext }
            disabled = { atBack }
            aria-disabled = { atBack }
            aria-label = "Next"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function SpreadView({ spread, arW, arH }) {
  const [left, right] = spread;
  return (
    <div className = "spread">
      <PageSide side = "left" page = { left } arW = { arW } arH = { arH } />
      <div className = "gutter" aria-hidden = "true" />
      <PageSide side = "right" page = { right } arW = { arW } arH = { arH } />
      <div className = "spread-meta" />
    </div>
  );
}

function PageSide({ side, page, arW, arH }) {
  if (!page) return <div className = { `page page--${side} page--empty` } />;

  return (
    <div className={ `page page--${side}` }>
      {page.type === 'image' && (
        <>
          <figure
            className = "photo uniform"
            style = {{ ['--photo-ar']: `${arW} / ${arH}` }}
          >
            <Image
              src = { page.src }
              alt = { page.caption || '' }
              fill
              className = "photo-img"
              style = {{ objectFit: 'contain' }}  // no crop
              sizes = "(max-width: 900px) 100vw, 50vw"
              placeholder = { typeof page.src === 'object' ? 'blur' : undefined }
            />
          </figure>
          { page.caption && <figcaption className="cap">{page.caption}</figcaption> }
        </>
      )}

      {page.type === 'text' && (
        <article className = "page-article">
          {page.title && <h3>{page.title}</h3>}
          {page.body && <p>{page.body}</p>}
        </article>
      )}
    </div>
  );
}
