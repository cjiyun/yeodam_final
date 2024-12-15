export interface UserProfile {
  user_id: string;
  nickname: string;
  profile_image: string | null;
}

export interface user_keywords {
  user_id: string;
  keyword_id: string;
}

// 인증 관련 상태 업데이트 함수 타입들
export interface AuthStateHandlers {
  setUserInfo: (user: UserProfile | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
} 