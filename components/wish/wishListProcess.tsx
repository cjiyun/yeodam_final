import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { showToastMessage } from '../../common/utils';
import { wishList } from '../../types/typeInterfaces';

// 찜 목록 조회 함수
export const getWishList = async (userId: string): Promise<wishList> => {
    try {
        const wishListStr = await AsyncStorage.getItem(`wishlist_${userId}`);
        const defaultWishList = { 
            user_id: userId, 
            dest_list: [], 
            rest_list: [] 
        };
        return wishListStr ? JSON.parse(wishListStr) : defaultWishList;
    } catch (error) {
        console.error('찜 목록 조회 실패:', error);
        return { 
            user_id: userId, 
            dest_list: [], 
            rest_list: [] 
        };
    }
};

// 찜하기/취소 함수
export const toggleWishList = async (userId: string, destId: string) => {
    try {
        const currentList = await getWishList(userId);
        const isWished = currentList.dest_list?.includes(destId) || false;
        
        const newDestList = isWished
            ? currentList.dest_list.filter(id => id !== destId)
            : [...(currentList.dest_list || []), destId];

        await AsyncStorage.setItem(`wishlist_${userId}`, JSON.stringify({
            ...currentList,
            dest_list: newDestList
        }));
        
        showToastMessage(isWished ? '취소되었습니다.' : '가보고 싶은 장소로 등록되었습니다.');
        console.log('찜 상태 업데이트 완료:', isWished);
        return !isWished;
    } catch (error) {
        console.error('찜하기 처리 실패:', error);
        showToastMessage('처리 중 오류가 발생했습니다');
        throw error;
    }
};

// 찜하기 버튼 클릭 핸들러
export const handleWishClick = async (destId: string, userId: string) => {
  try {
      const result = await toggleWishList(userId, destId);
      return result; // toggleWishList의 결과를 반환
  } catch (error) {
      console.error('찜하기 실패:', error);
      showToastMessage('찜하기 처리 중 오류가 발생했습니다');
      return false;
  }
};

// 찜 상태 확인 Hook
export const useWishListStatus = (userId: string, destId: string) => {
    const [isWished, setIsWished] = useState(false);

    useEffect(() => {
        const checkWishStatus = async () => {
            try {
                const wishList = await getWishList(userId);
                setIsWished(wishList.dest_list?.includes(destId) || false);
            } catch (error) {
                console.error('찜 상태 확인 실패:', error);
            }
        };

        if (userId && destId) {
            checkWishStatus();
        }
    }, [userId, destId]);

    return isWished;
};