import { useState, useEffect } from 'react';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { useAuth } from '../../../contexts/AuthContext';
import { Review } from '../../../types/typeInterfaces';

// 단일 장소의 리뷰 가져오기
export const useReviews = (type: 'destinations' | 'restaurants', id: string) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${EXPO_PUBLIC_API_URL}/${type}/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
    }
  };

  return { reviews, fetchReviews };
};

// 내가 작성한 모든 리뷰 가져오기
export const useMyReviews = () => {
  const { user } = useAuth();
  const [destReviews, setDestReviews] = useState<Review[]>([]);
  const [restReviews, setRestReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const [destResponse, restResponse] = await Promise.all([
        axios.get(`${EXPO_PUBLIC_API_URL}/users/${user?.user_id}/destination-reviews`),
        axios.get(`${EXPO_PUBLIC_API_URL}/users/${user?.user_id}/restaurant-reviews`)
      ]);
      setDestReviews(destResponse.data);
      setRestReviews(restResponse.data);
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user]);

  return { 
    destReviews, 
    restReviews, 
    setDestReviews,
    setRestReviews,
    fetchReviews 
  };
};
