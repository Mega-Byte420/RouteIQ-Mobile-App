import React from 'react';
import {Path, Svg} from 'react-native-svg';

const ChatIcon = ({color = '#C01823'}: any) => {
  return (
    <Svg width="26" height="24" viewBox="0 0 26 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.1545 19.0699C16.9761 22.1263 12.2696 22.7867 8.41814 21.074C7.84956 20.8539 7.38341 20.676 6.94026 20.676C5.7059 20.683 4.16948 21.8339 3.37096 21.067C2.57244 20.2991 3.77022 18.8206 3.77022 17.6266C3.77022 17.2004 3.59254 16.7602 3.36365 16.2124C1.58161 12.5096 2.26934 7.98269 5.44774 4.92721C9.50513 1.02443 16.0971 1.02443 20.1545 4.9262C24.2192 8.83501 24.2119 15.1681 20.1545 19.0699Z"
        fill={color}
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.8973 12.413H16.9066"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.7278 12.413H12.7372"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.55853 12.413H8.56789"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ChatIcon;
