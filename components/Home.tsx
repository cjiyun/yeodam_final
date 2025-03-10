import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { typography } from '../styles/typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { destination, destination_keywords } from '../types/typeInterfaces';
import { RootStackParamList } from '../types/navigation';
import { AntDesign } from '@expo/vector-icons';
import { handleWishClick, getWishList } from './wish/wishListProcess';
import { showToastMessage } from '../common/utils';
import { useAuth } from '../contexts/AuthContext';
import { mockTopRatedDestinations, mockDestinations, mockCategories, mockDestinationsKeywords } from '../constants/mockData';
import Header from './Header';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  // 1. Navigation & Context Hooks
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  // 2. State Hooks
  const [banners, setBanners] = useState<destination[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, destination[]>>({});
  const [destinations] = useState(mockDestinations);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [wishListItems, setWishListItems] = useState<string[]>([]);

  // 3. Effects
  useEffect(() => {
    setBanners(mockTopRatedDestinations);
  }, []);

  useEffect(() => {
    const purposeKeywords = mockCategories
      .filter(category => category.category_id === '2')
      .map(category => category.keyword_name);

    const recommendationsByPurpose = purposeKeywords.reduce((acc, keyword) => ({
      ...acc,
      [keyword]: mockDestinations.filter(dest => 
        mockDestinationsKeywords
          .filter(dk => dk.keyword_id === mockCategories.find(c => c.keyword_name === keyword)?.keyword_id)
          .some(dk => dk.dest_id === dest.dest_id)
      )
    }), {});

    setRecommendations(recommendationsByPurpose);
    setSelectedKeywords(purposeKeywords);
  }, []);

  useEffect(() => {
    if (selectedKeyword) {
      const filtered = destinations.filter(dest => {
        const keywords = mockDestinationsKeywords
          .filter(dk => dk.dest_id === dest.dest_id)
          .map(dk => {
            const category = mockCategories.find(c => c.keyword_id === dk.keyword_id);
            return category?.keyword_name;
          });
        return keywords.includes(selectedKeyword);
      });
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [selectedKeyword, destinations]);

  useEffect(() => {
    const fetchWishList = async () => {
      if (user?.user_id) {
        const list = await getWishList(user.user_id);
        setWishListItems(list.dest_list || []);
      }
    };
    fetchWishList();
  }, [user?.user_id]);

  const { width } = Dimensions.get('window');

  // 추천 관광지 클릭 핸들러
  const handleDestinationPress = (destId: string) => {
    navigation.navigate('destination', { dest_id: destId });
  };

  const handleWishButtonClick = async (destId: string) => {
    if (!user?.user_id) {
      showToastMessage('로그인 후에 사용 가능합니다');
      return;
    }
    await handleWishClick(destId, user.user_id);
    // 찜 목록 즉시 업데이트
    const newList = await getWishList(user.user_id);
    setWishListItems(newList.dest_list || []);
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
                <Image source={banner.image[0]} style={styles.mainBannerImage} />
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
                <View style={styles.recommendHeader}>
                  <Text style={styles.recommendTitle}>#{keyword}</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {recommendations[keyword]?.map((destination) => (
                    <TouchableOpacity 
                      key={destination.dest_id} 
                      style={styles.recommendItem}
                      onPress={() => handleDestinationPress(destination.dest_id)}
                    >
                      <View style={styles.wishButtonContainer}>
                        <Pressable 
                          onPress={() => handleWishButtonClick(destination.dest_id)}
                        >
                          <AntDesign 
                            name={wishListItems.includes(destination.dest_id) ? "heart" : "hearto"} 
                            size={30} 
                            color={wishListItems.includes(destination.dest_id) ? "#eb4b4b" : "#3d3d3d"} 
                          />
                        </Pressable>
                      </View>
                      <Image source={destination.image[0]} style={styles.destinationImage} />
                      <Text style={styles.destinationName}>{destination.dest_name}</Text>
                    </TouchableOpacity>
                  ))}
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
  recommendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    ...typography.regular,
    color: '#666',
    fontSize: 14,
  },
  wishButtonContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    borderRadius: 15,
    padding: 5,
  },
});
