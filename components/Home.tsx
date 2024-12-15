import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { typography } from '../styles/typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { destination } from '../types/typeInterfaces';
import { RootStackParamList } from '../types/navigation';
import { AntDesign } from '@expo/vector-icons';
import { handleWishClick, useWishListStatus } from './wish/wishListProcess';
import { showToastMessage } from '../common/utils';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import Header from './Header';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const [banners, setBanners] = useState<destination[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, destination[]>>({});

  // 상위 평점 5개 관광지 가져오기
  useEffect(() => {
    const fetchTopRatedDestinations = async () => {
      try {
        // 평점 높은 상위 5개 관광지 요청
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/destinations/top-rated`);
        setBanners(response.data);
      } catch (error) {
        console.error('상위 평점 관광지 로딩 실패:', error);
      }
    };
    fetchTopRatedDestinations();
  }, []);

  // 추천 데이터 가져오기
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // 로그인한 경우: 개인화된 추천
        if (user?.user_id) {
          const response = await axios.get(
            `${EXPO_PUBLIC_API_URL}/recommendations/user/${user.user_id}`
          );
          setRecommendations({
            "추천 관광지": response.data
          });
          setSelectedKeywords(["추천 관광지"]);
        } 
        // 비로그인: count 높은 키워드별 관광지 표시
        else {
          // 1. count 기준 상위 키워드 5개와 해당 키워드의 관광지들 가져오기
          const response = await axios.get(
            `${EXPO_PUBLIC_API_URL}/destinations/popular-keywords`
          );
          
          // response.data 형태:
          // {
          //   keywords: ['힐링', '관광', '자연' ...],
          //   destinations: {
          //     '힐링': [{dest_id, dest_name, image...}],
          //     '관광': [{dest_id, dest_name, image...}],
          //     '자연': [{dest_id, dest_name, image...}]
          //   }
          // }
          
          setRecommendations(response.data.destinations);
          setSelectedKeywords(response.data.keywords);
        }
      } catch (error) {
        console.error('추천 데이터 로딩 실패:', error);
      }
    };
    fetchRecommendations();
  }, [user]);

  const { width } = Dimensions.get('window');

  // 추천 관광지 클릭 핸들러
  const handleRecommendClick = (destination: destination) => {
    navigation.navigate('destination', { 
      dest_id: destination.dest_id
    });
  };

  const BannerSection = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);

    // 수동 슬라이드 함수들
    const scrollToPrevious = () => {
      const newIndex = currentBannerIndex === 0 
        ? banners.length - 1 
        : currentBannerIndex - 1;
      
      scrollViewRef.current?.scrollTo({
        x: newIndex * width,
        animated: true,
      });
      setCurrentBannerIndex(newIndex);
    };

    const scrollToNext = () => {
      const newIndex = currentBannerIndex === banners.length - 1
        ? 0
        : currentBannerIndex + 1;
      
      scrollViewRef.current?.scrollTo({
        x: newIndex * width,
        animated: true,
      });
      setCurrentBannerIndex(newIndex);
    };

    // 자동 슬라이드
    useEffect(() => {
      const timer = setInterval(scrollToNext, 3000);
      return () => clearInterval(timer);
    }, [currentBannerIndex]);

    return (
      <View style={styles.bannerSection}>
        <View style={styles.bannerContainer}>
          <TouchableOpacity onPress={scrollToPrevious} style={[styles.arrow, styles.leftArrow]}>
            <Image source={require('../assets/images/left-arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={scrollToNext} style={[styles.arrow, styles.rightArrow]}>
            <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>

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
              const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
              setCurrentBannerIndex(newIndex);
            }}
            style={{ width: width }}
            contentContainerStyle={{ width: width * banners.length }}
          >
            {banners.map((banner, index) => (
              <TouchableOpacity
                key={banner.dest_id}
                style={[styles.mainBanner, { width }]}
                onPress={() => navigation.navigate('destination', { 
                  dest_id: banner.dest_id
                })}
                activeOpacity={1}
              >
                <Image source={banner.image} style={styles.mainBannerImage} />
                <Text style={styles.bannerTitle}>{banner.dest_name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* 배너 섹션 */}
          <BannerSection />

          {/* 추천 섹션 */}
          {selectedKeywords.length > 0 ? (
            selectedKeywords.map((keyword) => (
              <View key={keyword} style={styles.recommendSection}>
                <Text style={styles.recommendTitle}>#{keyword}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {recommendations[keyword]?.map((destination) => {
                    const isWished = user?.user_id ? useWishListStatus(user.user_id, destination.dest_id) : false;
                    return (
                      <TouchableOpacity 
                        key={destination.dest_id} 
                        style={styles.recommendItem}
                        onPress={() => handleRecommendClick(destination)}
                      >
                        <Pressable onPress={() => {
                          if (!user?.user_id) {
                            showToastMessage('로그인 후에 사용 가능합니다');
                            return;
                          }
                          handleWishClick(destination.dest_id, user.user_id);
                        }}>                            
                          <AntDesign 
                            name={isWished ? "heart" : "hearto"} 
                            size={30} 
                            color={isWished ? "#eb4b4b" : "#999"} 
                          />
                        </Pressable>
                        <Image source={destination.image} style={styles.destinationImage} />
                        <Text style={styles.destinationName}>{destination.dest_name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            ))
          ) : (
            <Text style={styles.loadingText}>추천 여행지 로딩 중...</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth * 0.455;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  arrow: {
    position: 'absolute',
    top: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 15,
    zIndex: 3,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
  bannerSection: {
    marginTop: 20,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
  mainBanner: {
    width: '100%',
    height: '100%',
  },
  mainBannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  bannerTitle: {
    ...typography.regular,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  recommendSection: {
    marginTop: 50,
  },
  recommendList: {
    flexDirection: 'row',
  },
  recommendTitle: {
    ...typography.bold,
    fontSize: 25,
    marginBottom: 10,
  },
  recommendItem: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    width: itemWidth,
    overflow: 'hidden',
    marginRight: 10,
  },
  destinationImage: {
    width: '100%',
    height: 200,
  },
  destinationName: {
    ...typography.regular,
    fontSize: 16,
    margin: 10,
  },
  noRecommendations: {
    marginHorizontal: 70,
    marginTop: 50,
  },
  loadingText: {
    ...typography.regular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});
