import {setRole} from '../store/user/userSlices';
import {AppColors} from './color';

export const handleSetRole = (role: string, navigation: any, dispatch: any) => {
  switch (role) {
    case 'Driver':
      dispatch(setRole('Driver'));
      navigation.navigate('Login');
      return;
    case 'Parents':
      dispatch(setRole('Parents'));
      navigation.navigate('Login');
      return;
      case 'Retail':
        dispatch(setRole('Retail'));
        navigation.navigate('Login');
        return;
  }
};

export const handleSetColor = (status: string) => {
  switch (status) {
    case 'Pre-Trip':
      return '#026634';
    case 'Spot':
      return '#FB8021';
    default:
      return AppColors.red;
  }
};

export const handleSetFrontInspention = (title: string, setIsChecked: any) => {
  setIsChecked((prev: any) => ({
    ...prev,
    [title]: !prev[title],
  }));
};

export const handleInspectionButtonTitle = (selectedIndex: number) => {
  switch (selectedIndex) {
    case 0:
      return 'Scan';
    case 1:
      return 'Inspect Front Side';
    case 2:
      return 'Next';
    case 3:
      return 'Submit Report';
  }
};

export const truncateString = (title: string, length: number) => {
  if (title.length > length) {
    return title.slice(0, length) + '...';
  } else {
    return title;
  }
};
