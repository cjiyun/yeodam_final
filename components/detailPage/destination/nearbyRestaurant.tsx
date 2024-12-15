import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { restaurant } from '../../../types/typeInterfaces';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';

const { width } = Dimensions.get('window');

export default function NearbyRestaurants({ destId }: { destId: string }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<restaurant[]>([]);

  // 근방 맛집 목록 가져오기
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          `${EXPO_PUBLIC_API_URL}/destinations/${destId}/restaurants`
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error('맛집 데이터 로딩 실패:', error);
      }
    };
    fetchRestaurants();
  }, [destId]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>근방 맛집</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('restaurant', { rest_id: restaurants[0].rest_id })}
        >
          <Text style={styles.moreButton}>더보기</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.restaurantsContainer}
      >
        {restaurants.slice(0, 5).map((restaurant) => (
          <TouchableOpacity 
            key={restaurant.rest_id}
            style={styles.restaurantCard}
            onPress={() => navigation.navigate('restaurant', { 
              rest_id: restaurant.rest_id 
            })}
          >
            <Image 
              source={{ uri: restaurant.image }} 
              style={styles.restaurantImage} 
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.rest_name}</Text>
              <Text style={styles.restaurantContact}>{restaurant.contact}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreButton: {
    color: '#007AFF',
  },
  restaurantsContainer: {
    marginTop: 8,
  },
  restaurantCard: {
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
  restaurantImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  restaurantInfo: {
    padding: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantContact: {
    fontSize: 14,
    color: '#666',
  },
});