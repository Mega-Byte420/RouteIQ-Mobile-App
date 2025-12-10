import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation'
import CustomIcon from './CustomIcon';
import FontelloIcon from './FontelloIcon';

interface IconProps {
  name: any;
  size?: any;
  color?: any;
}

interface IconLibraries {
  [key: string]: React.ComponentType<IconProps>;
}

const iconLibraries: IconLibraries = {
  FontAwesome: FontAwesomeIcon,
  FontAwesome5: FontAwesome5,
  FontAwesome6: FontAwesome6,
  MaterialIcons: MaterialIcons,
  AntDesign: AntDesign,
  Fontisto: Fontisto,
  Feather: Feather,
  Entypo: Entypo,
  Ionicons: Ionicons,
  EvilIcons: EvilIcons,
  MaterialCommunityIcons: MaterialCommunityIcons ,
  Octicons: Octicons ,
  CustomIcon: CustomIcon,
  Foundation: Foundation ,
  FontelloIcon: FontelloIcon 
};

const GlobalIcon: React.FC<IconProps & { library?: string }> = ({ library = 'FontAwesome', name = 'arrow', size = 24, color = '#fff', ...props }) => {
  const SelectedIcon = iconLibraries[library]; 

  return <SelectedIcon name={name} size={size} color={color} {...props} />;
};

export default GlobalIcon;
