import { ToastAndroid } from 'react-native';

// Toast 메시지 표시 함수
export const showToastMessage = (msg: string) => {
  ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
  );
};