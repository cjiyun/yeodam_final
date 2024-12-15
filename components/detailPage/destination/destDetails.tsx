import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, ImageSourcePropType } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { mockDestinations } from '../../../constants/mockData';
import { typography } from '../../../styles/typography';
import { RootStackParamList } from '../../../types/navigation';
import NearbyRestaurants from './nearbyRestaurant';
import DestinationReviewSection from '../review/destinationReview';
import Rating from '../rating/displayRating';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { useGoogleRating } from '../rating/getGoogleRating';
import { ActivityIndicator } from 'react-native';
import ReviewForm from '../review/reviewForm';
import { useReviews } from '../review/getReviews';
const { width } = Dimensions.get('window');

export default function DestinationScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'destination'>>();
  const { dest_id } = route.params;
  const destination = mockDestinations.find(d => d.dest_id === dest_id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const { isLoading, error, googleRating, fetchGoogleRating } = useGoogleRating('destinations', dest_id);
  const [reviews, setReviews] = useState([]);

  // 제목 설정
  useEffect(() => {
    if (destination) {
      navigation.setOptions({ title: destination.dest_name });
    }
  }, [destination]);

  // 3초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % destination!.image.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentImageIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  useEffect(() => {
    const fetchKeywords = async () => {
      // destination_keywords와 category 테이블을 조인하여 키워드 이름들을 가져옴
      const response = await axios.get(`${EXPO_PUBLIC_API_URL}/destinations/${dest_id}/keywords`);
      setKeywords(response.data);
    };
    fetchKeywords();
  }, [dest_id]);

  // Google Places API에서 평점 가져오기
  useEffect(() => {
    fetchGoogleRating();
  }, [dest_id]);

  if (!destination) {
    return (
      <View style={styles.container}>
        <Text>관광지를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 이미지 슬라이더 */}
      <View style={styles.header}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(newIndex);
          }}
        >
          {destination.image.map((image: ImageSourcePropType, index: number) => (
            <Image
              key={index}
              source={image}
              style={[styles.headerImage, { width }]}
            />
          ))}
        </ScrollView>

        {/* 페이지 인디케이터 */}
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>
            {currentImageIndex + 1} / {destination.image.length}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Google 평점 섹션 */}
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : googleRating && (
        <Rating 
          rating={googleRating.rating} 
          count={googleRating.count} 
        />
      )}

      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{destination.dest_name}</Text>
          <Text style={styles.location}>{destination.location}</Text>
        </View>

        {/* 키워드 태그 */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tagsContainer}
        >
          {keywords.map((keyword, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{keyword}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 주소 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주소</Text>
          <Text style={styles.address}>{destination.address}</Text>
        </View>

        {/* 상세 설명 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세 정보</Text>
          <Text style={styles.description}>{destination.description}</Text>
        </View>

        {/* 근방 맛집 섹션 */}
        <NearbyRestaurants destId={dest_id} />

        {/* 리뷰 섹션 */}
        <DestinationReviewSection destId={dest_id} />

        <ReviewForm 
          type="destination" 
          id={dest_id} 
          onSuccess={useReviews('destinations', dest_id).fetchReviews} 
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    ...typography.bold,
    fontSize: 24,
    marginBottom: 4,
  },
  location: {
    ...typography.regular,
    fontSize: 16,
    color: '#666',
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#145C80',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  tagText: {
    ...typography.regular,
    color: 'white',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.bold,
    fontSize: 18,
    marginBottom: 8,
  },
  address: {
    ...typography.regular,
    fontSize: 16,
    color: '#333',
  },
  description: {
    ...typography.regular,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  recommendationsContainer: {
    marginTop: 8,
  },
  recommendationCard: {
    width: width * 0.6,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  recommendationTitle: {
    ...typography.bold,
    fontSize: 16,
    padding: 8,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 12,
  },
  paginationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    padding: 16,
    textAlign: 'center'
  },
});
