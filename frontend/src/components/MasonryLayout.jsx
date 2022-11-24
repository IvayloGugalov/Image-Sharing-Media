import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

import '../styles/pin.css';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }

  for(const pin of document.querySelectorAll('.pin')) {
    pin.onmousemove = (e) => handleOnMouseMove(e);
  }

  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
      {pins?.map((pin) => <Pin key={pin._id} pin={pin} />)}
    </Masonry>
  );
}

export default MasonryLayout;