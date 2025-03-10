import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenAuth = {
  verifyToken: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const loginType = await AsyncStorage.getItem('loginType');
      const userInfoStr = await AsyncStorage.getItem('userInfo');

      if (accessToken && loginType && userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        return {
          isValid: true,
          user: userInfo
        };
      }
      return null;
    } catch (error) {
      console.error('토큰 유효성 검사 실패:', error);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('loginType');
      await AsyncStorage.removeItem('userInfo');
      return null;
    }
  }
};

export default tokenAuth; 