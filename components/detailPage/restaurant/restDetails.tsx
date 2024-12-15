import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { typography } from '../../../styles/typography';
import { RootStackParamList } from '../../../types/navigation';
import RestaurantReviewSection from '../review/restaurantReview';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { restaurant } from '../../../types/typeInterfaces';
import NearbyDestinations from './nearbyDestination';
import { useGoogleRating } from '../rating/getGoogleRating';
import Rating from '../rating/displayRating';
import ReviewForm from '../review/reviewForm';
import { useReviews } from '../review/getReviews';

const { width } = Dimensions.get('window');

export default function RestaurantScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'restaurant'>>();
    const { rest_id } = route.params;
    const [restaurant, setRestaurant] = useState<restaurant | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const { isLoading, error, googleRating, fetchGoogleRating } = useGoogleRating('restaurants', rest_id);

    // 맛집 정보 가져오기
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get(`${EXPO_PUBLIC_API_URL}/restaurants/${rest_id}`);
                setRestaurant(response.data);
                navigation.setOptions({ title: response.data.rest_name });
            } catch (error) {
                console.error('맛집 데이터 로딩 실패:', error);
            }
        };
        fetchRestaurant();
    }, [rest_id]);

    // 제목 설정
    useEffect(() => {
        if (restaurant) {
            navigation.setOptions({ title: restaurant.rest_name });
        }
    }, [restaurant]);

    // 3초마다 자동 슬라이드
    useEffect(() => {
        if (restaurant?.image) {  // 이미지가 있을 경우에만 실행
            const timer = setInterval(() => {
                const nextIndex = (currentImageIndex + 1) % (restaurant.image?.length || 1);
                scrollViewRef.current?.scrollTo({
                    x: nextIndex * width,
                    animated: true,
                });
                setCurrentImageIndex(nextIndex);
            }, 3000);

            return () => clearInterval(timer);  // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [currentImageIndex, restaurant]);

    useEffect(() => {
        fetchGoogleRating();
    }, [rest_id]);

    if (!restaurant) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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
                    {restaurant.image ? JSON.parse(restaurant.image).map((image: string, index: number) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={[styles.headerImage, { width }]}
                        />
                    )) : []}
                </ScrollView>

                {/* 페이지 인디케이터 */}
                <View style={styles.pagination}>
                    <Text style={styles.paginationText}>
                        {currentImageIndex + 1} / {restaurant.image?.length || 1}
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

            <View style={styles.content}>
                {/* 맛집 정보 */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{restaurant.rest_name}</Text>
                    <Text style={styles.location}>{restaurant.location}</Text>
                </View>

                {/* 연락처 */}
                {restaurant.contact && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>연락처</Text>
                        <Text style={styles.contact}>{restaurant.contact}</Text>
                    </View>
                )}

                {/* 주소 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>주소</Text>
                    <Text style={styles.address}>{restaurant.address}</Text>
                </View>

                {/* 상세 설명 */}
                {restaurant.description && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>상세 정보</Text>
                        <Text style={styles.description}>{restaurant.description}</Text>
                    </View>
                )}

                {/* 근방 관광지 섹션 */}
                <NearbyDestinations restId={rest_id} />

                {/* 리뷰 섹션 */}
                <RestaurantReviewSection restId={rest_id} />

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

                <ReviewForm 
                    type="restaurant" 
                    id={rest_id} 
                    onSuccess={useReviews('restaurants', rest_id).fetchReviews} // 리뷰 목록 새로고침
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        ...typography.bold,
        fontSize: 18,
        marginBottom: 8,
    },
    contact: {
        ...typography.regular,
        fontSize: 16,
        color: '#333',
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
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 16,
    }
}); 