export interface destination {
  dest_id: string;
  dest_name: string;
  location?: string;      // nullable
  address?: string;       // nullable
  description?: string;   // nullable
  image?: any;         // nullable
  nearbyRestaurants?: any;
  rating: number; 
} 

export interface NearbyRestaurant {
  name: string;
  image: any;
}

export interface destination_keywords {
  dest_id: string;
  keyword_id: string;
}

export interface category {
  category_id: string;
  category_name: string;
  keyword_id: string;
  keyword_name: string;
  count: number;
}

export interface wishList {
  user_id: string;
  dest_list: string[];  // dest_id 배열을 JSON으로 저장
  rest_list: string[];  // rest_id 배열을 JSON으로 저장
}

export interface destinationReview {
  dest_rev_id: number;
  dest_id: string;
  user_id: string;
  content: string;
  date: string;
  created_at: string;
  nickname: string;
}

export interface restaurant {
  rest_id: string;
  rest_name: string;
  location?: string;
  address?: string;
  description?: string;
  image?: string;  // TEXT 타입이므로 string으로 변경
  contact?: string;
}

export interface restaurantReview {
  rest_rev_id: number;
  rest_id: string;
  user_id: string;
  date: string;
  content: string;
  created_at: string;
  nickname?: string;  // JOIN으로 가져올 user 정보
}

export interface Review {
  // 공통 필드
  user_id: string;
  date: string;
  content: string;
  created_at: string;
  // 관광지 리뷰 필드
  dest_rev_id?: number;
  dest_id?: string;
  dest_name?: string;
  // 맛집 리뷰 필드
  rest_rev_id?: number;
  rest_id?: string;
  rest_name?: string;
}