import React from 'react';
import {Path, Rect, Svg} from 'react-native-svg';

const SquareCheckedIcon = () => {
  return (
    <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
      <Rect
        x="0.75"
        y="0.75"
        width="25.5"
        height="25.5"
        rx="5.25"
        fill="#F0EDE2"
        stroke="#808080"
        stroke-width="1.5"
      />
      <Path
        d="M11.0947 18.8732L6.21966 13.9982C5.92678 13.7053 5.92678 13.2304 6.21966 12.9375L7.2803 11.8768C7.57318 11.5839 8.04808 11.5839 8.34096 11.8768L11.625 15.1608L18.659 8.12683C18.9519 7.83395 19.4268 7.83395 19.7197 8.12683L20.7803 9.18749C21.0732 9.48037 21.0732 9.95524 20.7803 10.2482L12.1553 18.8732C11.8624 19.1661 11.3875 19.1661 11.0947 18.8732V18.8732Z"
        fill="#C01824"
      />
    </Svg>
  );
};

export default SquareCheckedIcon;
