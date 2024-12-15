import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface RatingProps {
  rating: number;
  count?: number;
}

export default function Rating({ rating, count }: RatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <AntDesign key={index} name="star" size={20} color="#FFD700" />;
          } else if (index === fullStars && halfStar) {
            return <AntDesign key={index} name="staro" size={20} color="#FFD700" />;
          }
          return <AntDesign key={index} name="staro" size={20} color="#FFD700" />;
        })}
      </View>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      {count !== undefined && (
        <Text style={styles.count}>({count})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
  },
  count: {
    fontSize: 16,
    color: '#666',
  },
});
