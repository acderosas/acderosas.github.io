// Ref: https://codesandbox.io/p/sandbox/book-pjug9?file=%2Fpackage.json
'use client';

import React, { useMemo, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const PageCover = forwardRef(({ children }, ref) => (
  <div className="page page-cover hard" ref={ref} data-density="hard">
    <div className="page-content"><h2>{children}</h2></div>
  </div>
));

const Page = forwardRef(({ children, blank = false }, ref) => (
  <div className={`page${blank ? ' page--blank' : ''}`} ref={ref}>
    <div className="page-content">{children}</div>
  </div>
));

export default function FlipBook({
  items = [],
  pages,
  insideFront = null,
  insideBack = null,
  frontTitle = 'Book Title',
}) {
  const content = pages ?? items;

  const book = useMemo(() => {
    const arr = [];
    arr.push(<PageCover key="cover-front">{frontTitle}</PageCover>);
    arr.push(<Page key="inside-front" blank={!insideFront}>{insideFront}</Page>);
    content.forEach((node, i) => arr.push(<Page key={`p-${i}`}>{node}</Page>));

    const innerCount = 1 + content.length;
    if (innerCount % 2 === 0) arr.push(<Page key="filler" blank />);

    arr.push(<Page key="inside-back" blank={!insideBack}>{insideBack}</Page>);
    arr.push(<PageCover key="cover-back" />);
    return arr;
  }, [content, insideFront, insideBack, frontTitle]);

  return (
    <div className="pageflip-wrap">
      <div className="book-boundary">
        <HTMLFlipBook
          className="html-book"
          width={550}         
          height={733}
          size="stretch"
          minWidth={420}
          maxWidth={1200}    
          minHeight={520}
          maxHeight={900}
          showCover
          usePortrait={false}
          mobileScrollSupport
          maxShadowOpacity={0.5}
        >
          {book}
        </HTMLFlipBook>
      </div>
    </div>
  );
}

