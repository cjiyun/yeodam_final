import React, { createContext, useContext, useState } from 'react';
import { EXPO_PUBLIC_API_URL } from '@env';
import axios from 'axios';
import { UserProfile } from '../types/auth';

// 컨텍스트 타입 정의
interface AuthContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    isLoggedIn: boolean;
    isFirstLogin: boolean;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 컴포넌트
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);

    const value = {
        user,
        setUser: async (userData: UserProfile | null) => {
            if (userData) {
                try {
                    // user_keywords 테이블에서 해당 user_id의 keyword_id 존재 여부 확인
                    const response = await axios.get(
                      `${EXPO_PUBLIC_API_URL}/users/${userData.user_id}/keywords`
                    );
                    // user_keywords 테이블에 데이터가 없으면 첫 로그인
                    setIsFirstLogin(response.data.length === 0);
                } catch (error) {
                    console.error('사용자 키워드 확인 실패:', error);
                }
            }
            setUser(userData);
        },
        isLoggedIn: !!user,
        isFirstLogin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 커스텀 훅
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 