import React from 'react';
import {Circle, Svg} from 'react-native-svg';
import {AppIconProps} from '../../types/types';
import {hp} from '../../utils/constants';

const CircleUnCheckBoxIcon: React.FC<AppIconProps> = ({
  height = hp(3.2),
  width = hp(3.2),
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 31 31" fill="none">
      <Circle
        cx="15.5"
        cy="15.5"
        r="14.25"
        fill="#F0EDE2"
        stroke="#808080"
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default CircleUnCheckBoxIcon;
