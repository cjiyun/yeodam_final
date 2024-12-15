import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';

const { width } = Dimensions.get('window');

export default function NearbyDestinations({ restId }: { restId: string }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [destinations, setDestinations] = useState<any[]>([]);

  // 근방 관광지 목록 가져오기
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          `${EXPO_PUBLIC_API_URL}/restaurants/${restId}/destinations`
        );
        setDestinations(response.data);
      } catch (error) {
        console.error('관광지 데이터 로딩 실패:', error);
      }
    };
    fetchDestinations();
  }, [restId]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>근방 관광지</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('destination', { dest_id: destinations[0].dest_id })}
        >
          <Text style={styles.moreButton}>더보기</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.destinationsContainer}
      >
        {destinations.slice(0, 5).map((destination) => (
          <TouchableOpacity 
            key={destination.dest_id}
            style={styles.destinationCard}
            onPress={() => navigation.navigate('destination', { 
              dest_id: destination.dest_id 
            })}
          >
            <Image 
              source={{ uri: JSON.parse(destination.image)[0] }} 
              style={styles.destinationImage} 
            />
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>{destination.dest_name}</Text>
              <Text style={styles.destinationLocation}>{destination.location}</Text>
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
  destinationsContainer: {
    marginTop: 8,
  },
  destinationCard: {
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
  destinationImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  destinationInfo: {
    padding: 8,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  destinationLocation: {
    fontSize: 14,
    color: '#666',
  },
}); 