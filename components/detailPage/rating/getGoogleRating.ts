import { useState } from 'react';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';

interface GoogleRating {
  rating: number;
  count: number;
}

export const useGoogleRating = (type: 'destinations' | 'restaurants', id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleRating, setGoogleRating] = useState<GoogleRating | null>(null);

  const fetchGoogleRating = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(
        `${EXPO_PUBLIC_API_URL}/${type}/${id}/google-rating`
      );
      setGoogleRating(response.data);
    } catch (error) {
      setError('평점을 불러올 수 없습니다');
      console.error('평점 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, googleRating, fetchGoogleRating };
};
