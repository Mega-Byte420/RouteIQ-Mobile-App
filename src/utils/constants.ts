import { StatusBar, Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const screenHeight = Dimensions.get("screen").height
export const screenWidth = Dimensions.get("screen").width
export const wp = (widthPercent: any) => widthPercentageToDP(widthPercent);
export const hp = (heightPercent: any) => heightPercentageToDP(heightPercent);

export const StatusBarHeight = () => {
    return StatusBar.currentHeight;
}

export const shortDescription = (description: string, length: number) => {
  const descriptionParagraph = description?.slice(0, length);
  return descriptionParagraph || '';
}