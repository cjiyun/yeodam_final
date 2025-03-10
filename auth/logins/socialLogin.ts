import { login, logout, unlink, me } from '@react-native-kakao/user';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { UserProfile } from '../../types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import NaverLogin from '@react-native-seoul/naver-login';

const handleSocialLogin = {
  
  // 카카오 로그인 시작
  kakaoLogin: async () => {
    try {
      const token = await login();
      const userInfo = await me();
      
      const profile: UserProfile = {
        user_id: `kakao_${userInfo.id}`,
        nickname: userInfo.nickname || '카카오 사용자',
        profile_image: userInfo.profileImageUrl || ''
      };
      
      await AsyncStorage.setItem('accessToken', token.accessToken);
      await AsyncStorage.setItem('loginType', 'KAKAO');
      await AsyncStorage.setItem('userInfo', JSON.stringify(profile));
      
      return profile;
    } catch (error) {
      console.error('Kakao Login Error:', error);
      throw error;
    }
  },

  // 카카오 로그아웃
  kakaoLogout: async () => {
    try {
      // 1. 카카오 SDK 로그아웃
      await logout();
      
      // 2. 백엔드에 로그아웃 알림
      await axios.post(`${EXPO_PUBLIC_API_URL}/auth/logout`);
    } catch (error) {
      console.error('Kakao Logout Error:', error);
      throw error;
    }
  },

  // 카카오 연동 해제
  kakaoUnlink: async () => {
    try {
      await unlink();
    } catch (error) {
      console.error('Kakao Unlink Error:', error);
      throw error;
    }
  },

  // 구글 로그인
  googleLogin: async () => {
    try {
      // 1. Google Sign In 초기 설정
      await GoogleSignin.configure({
        webClientId: "YOUR_WEB_CLIENT_ID", // Google Cloud Console에서 발급받은 웹 클라이언트 ID
        offlineAccess: true  // 이 옵션을 추가해야 serverAuthCode를 받을 수 있습니다
      });

      // 2. Google Play Services 사용 가능한지 체크
      await GoogleSignin.hasPlayServices();

      // 3. 구글 로그인 실행
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo.data?.serverAuthCode) {
        throw new Error('Failed to get auth code from Google');
      }

      // 4. 백엔드로 인증 정보 전송
      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/google`, {
        code: userInfo.data.serverAuthCode
      });

      // 5. 백엔드 응답 처리
      if (response.data.user) {
        const userInfo: UserProfile = {
          user_id: response.data.user.user_id,
          nickname: response.data.user.nickname,
          profile_image: response.data.user.profile_image
        };
        
        await AsyncStorage.setItem('accessToken', response.data.token);
        await AsyncStorage.setItem('loginType', 'GOOGLE');
        
        return userInfo;
      }
      return null;

    } catch (error) {
      console.error('Google Login Error:', error);
      throw error;
    }
  },

  // 구글 로그아웃
  googleLogout: async () => {
    try {
      // 1. 구글 SDK 로그아웃
      await GoogleSignin.signOut();
      
      // 2. 백엔드에 로그아웃 알림
      await axios.post(`${EXPO_PUBLIC_API_URL}/auth/logout`);
      
      // 3. 로컬 스��리지 클리어
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('loginType');
      
    } catch (error) {
      console.error('Google Logout Error:', error);
      throw error;
    }
  },

  // 구글 연동 해제
  googleUnlink: async () => {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.error('Google Unlink Error:', error);
      throw error;
    }
  },

  // 네이버 로그인
  naverLogin: async () => {
    try {
      const { successResponse } = await NaverLogin.login();
      
      if (successResponse) {
        // 백엔드로 인증 정보 전송
        const response = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/naver`, {
          token: successResponse.accessToken
        });

        // 백엔드 응답 처리
        if (response.data.user) {
          const userInfo: UserProfile = {
            user_id: response.data.user.user_id,
            nickname: response.data.user.nickname,
            profile_image: response.data.user.profile_image
          };
          
          await AsyncStorage.setItem('accessToken', response.data.token);
          await AsyncStorage.setItem('loginType', 'NAVER');
          
          return userInfo;
        }
      }
      return null;
    } catch (error) {
      console.error('Naver Login Error:', error);
      throw error;
    }
  },

  // 네이버 로그아웃
  naverLogout: async () => {
    try {
      // 1. 네이버 SDK 로그아웃
      await NaverLogin.logout();
      
      // 2. 백엔드에 로그아웃 알림
      await axios.post(`${EXPO_PUBLIC_API_URL}/auth/logout`);
      
      // 3. 로컬 스토리지 클리어
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('loginType');
      
    } catch (error) {
      console.error('Naver Logout Error:', error);
      throw error;
    }
  },

  // 네이버 연동 해제
  naverUnlink: async () => {
    try {
      await NaverLogin.deleteToken();
    } catch (error) {
      console.error('Naver Unlink Error:', error);
      throw error;
    }
  }

};

export default handleSocialLogin; 