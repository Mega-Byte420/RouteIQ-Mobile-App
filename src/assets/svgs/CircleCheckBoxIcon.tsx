import React from 'react';
import {Circle, Ellipse, Svg} from 'react-native-svg';
import {AppIconProps} from '../../types/types';
import {hp} from '../../utils/constants';

const CircleCheckBoxIcon: React.FC<AppIconProps> = ({
  width = hp(3.2),
  height = hp(3.2),
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 31 31" fill="none">
      <Circle
        cx="15.5"
        cy="15.5"
        r="14.25"
        fill="white"
        stroke="#808080"
        stroke-width="1.5"
      />
      <Ellipse
        cx="15.4999"
        cy="15.5"
        rx="5.19231"
        ry="5.19231"
        fill="#C01824"
      />
    </Svg>
  );
};

export default CircleCheckBoxIcon;
