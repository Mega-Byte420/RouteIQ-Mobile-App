import {Dimensions, PixelRatio} from 'react-native';

let width = Dimensions.get('window').width;
export const fontSize = (size: any) => {
  size = (width > 480 ? size * 0.6 : size) / 3.85;
  const elemWidth = parseFloat(size);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

const size = {
  xs: fontSize(10),
  s: fontSize(12),
  sl: fontSize(14),
  default: fontSize(15),
  md: fontSize(16),
  lg: fontSize(18),
  slg: fontSize(20),
  xlg: fontSize(22),
  vxlg: fontSize(24),
  xxlg: fontSize(28),
  xxxlg: fontSize(30),
  xxvlg: fontSize(32),
  extraxlg: fontSize(40),
};

export {size};