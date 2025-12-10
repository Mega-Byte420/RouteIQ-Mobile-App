import React from 'react';
import {Rect, Svg} from 'react-native-svg';

const SquareCheckBoxIcon = () => {
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
    </Svg>
  );
};

export default SquareCheckBoxIcon;
