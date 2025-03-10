import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { restaurant } from '../../../types/typeInterfaces';
import { useAuth } from '../../../contexts/AuthContext';
import { mockDestinations } from '../../../constants/mockData';
import { NearbyRestaurant } from '../../../types/typeInterfaces';

const { width } = Dimensions.get('window');

export default function NearbyRestaurants({ destId }: { destId: string }) {
  const destination = mockDestinations.find(d => d.dest_id === destId);
  const nearbyRestaurants = destination?.nearbyRestaurants || [];
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>근방 맛집</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('restaurantList', { 
            destId,
            restaurants: nearbyRestaurants 
          })}
          style={styles.moreButton}
        >
          <Text style={styles.moreButtonText}>더보기</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {nearbyRestaurants.map((restaurant: NearbyRestaurant, index: number) => (
          <TouchableOpacity 
            key={index}
            style={styles.restaurantCard}
          >
            <Image 
              source={restaurant.image}  // require로 불러온 이미지 사용
              style={styles.restaurantImage} 
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
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
    padding: 8,
    paddingBottom: 0,
  },
  moreButtonText: {
    color: '#666',
    fontSize: 14,
  },
  restaurantsContainer: {
    marginTop: 8,
  },
  restaurantCard: {
    width: width * 0.6,
    marginRight: 16,
    marginBottom: 5,
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