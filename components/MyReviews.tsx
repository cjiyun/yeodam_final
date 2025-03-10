import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { showToastMessage } from '../common/utils';
import { Review } from '../types/typeInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useMyReviews } from './detailPage/review/getReviews';
import { commonStyles } from '../styles/commonStyles';
import { typography } from '../styles/typography';
import Header from './Header';
import { mockReviews } from '../constants/mockData';

export default function MyReviews() {
  const [activeSection, setActiveSection] = useState<'destination' | 'restaurant'>('destination');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [destReviews, setDestReviews] = useState(mockReviews.destReviews);
  const [restReviews, setRestReviews] = useState(mockReviews.restReviews);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleDeleteReview = (review: any) => {
    if (activeSection === 'destination') {
      setDestReviews(prev => prev.filter(r => r.dest_rev_id !== review.dest_rev_id));
    } else {
      setRestReviews(prev => prev.filter(r => r.rest_rev_id !== review.rest_rev_id));
    }
  };

  const handleEditReview = (review: any) => {
    if (activeSection === 'destination') {
      setDestReviews(prev => prev.map(r => 
        r.dest_rev_id === review.dest_rev_id ? { ...r, content: editContent } : r
      ));
    } else {
      setRestReviews(prev => prev.map(r => 
        r.rest_rev_id === review.rest_rev_id ? { ...r, content: editContent } : r
      ));
    }
    setEditingReview(null);
    setEditContent('');
  };

  const renderContent = () => {
    if (!user) {
      return (
        <View style={commonStyles.container}>
          <Header />
          <View style={styles.container}>
            <Text style={styles.loginMessage}>로그인 후에 이용 가능합니다.</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={commonStyles.container}>
        <Header />
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeSection === 'destination' && styles.activeTab]}
            onPress={() => setActiveSection('destination')}
          >
            <Text style={[styles.tabText, activeSection === 'destination' && styles.activeTabText]}>
              여행지
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeSection === 'restaurant' && styles.activeTab]}
            onPress={() => setActiveSection('restaurant')}
          >
            <Text style={[styles.tabText, activeSection === 'restaurant' && styles.activeTabText]}>
              맛집
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.reviewList}>
          {activeSection === 'destination' ? (
            destReviews.length > 0 ? (
              destReviews.map(review => (
                <View key={review.dest_rev_id} style={styles.reviewCard}>
                  <TouchableOpacity
                    onPress={() => review.dest_id && navigation.navigate('destination', { dest_id: review.dest_id })}
                  >
                    <Text style={styles.placeName}>{review.dest_name}</Text>
                  </TouchableOpacity>
                  
                  {editingReview?.dest_rev_id === review.dest_rev_id ? (
                    <View style={styles.editContainer}>
                      <TextInput
                        style={styles.editInput}
                        value={editContent}
                        onChangeText={setEditContent}
                        multiline
                      />
                      <View style={styles.editButtons}>
                        <TouchableOpacity 
                          style={styles.editButton}
                          onPress={() => handleEditReview(review)}
                        >
                          <Text style={styles.buttonText}>저장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[styles.editButton, styles.cancelButton]}
                          onPress={() => {
                            setEditingReview(null);
                            setEditContent('');
                          }}
                        >
                          <Text style={styles.buttonText}>취소</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.reviewContent}>{review.content}</Text>
                      <View style={styles.reviewFooter}>
                        <Text style={styles.date}>
                          {new Date(review.date).toLocaleDateString()}
                        </Text>
                        <View style={styles.actions}>
                          <TouchableOpacity 
                            onPress={() => {
                              setEditingReview(review);
                              setEditContent(review.content);
                            }}
                          >
                            <Text style={styles.actionText}>수정</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDeleteReview(review)}>
                            <Text style={[styles.actionText, styles.deleteText]}>삭제</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.emptyMessage}>작성한 리뷰가 없습니다.</Text>
            )
          ) : (
            restReviews.length > 0 ? (
              restReviews.map(review => (
                <View key={review.rest_rev_id} style={styles.reviewCard}>
                  <TouchableOpacity
                    onPress={() => review.rest_id && navigation.navigate('restaurant', { rest_id: review.rest_id })}
                  >
                    <Text style={styles.placeName}>{review.rest_name}</Text>
                  </TouchableOpacity>
                  
                  {editingReview?.rest_rev_id === review.rest_rev_id ? (
                    <View style={styles.editContainer}>
                      <TextInput
                        style={styles.editInput}
                        value={editContent}
                        onChangeText={setEditContent}
                        multiline
                      />
                      <View style={styles.editButtons}>
                        <TouchableOpacity 
                          style={styles.editButton}
                          onPress={() => handleEditReview(review)}
                        >
                          <Text style={styles.buttonText}>저장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[styles.editButton, styles.cancelButton]}
                          onPress={() => {
                            setEditingReview(null);
                            setEditContent('');
                          }}
                        >
                          <Text style={styles.buttonText}>취소</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.reviewContent}>{review.content}</Text>
                      <View style={styles.reviewFooter}>
                        <Text style={styles.date}>
                          {new Date(review.date).toLocaleDateString()}
                        </Text>
                        <View style={styles.actions}>
                          <TouchableOpacity 
                            onPress={() => {
                              setEditingReview(review);
                              setEditContent(review.content);
                            }}
                          >
                            <Text style={styles.actionText}>수정</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDeleteReview(review)}>
                            <Text style={[styles.actionText, styles.deleteText]}>삭제</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.emptyMessage}>작성한 리뷰가 없습니다.</Text>
            )
          )}
        </ScrollView>
      </View>
    );
  };

  return renderContent();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  reviewList: {
    flex: 1,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007AFF',
  },
  reviewContent: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionText: {
    color: '#007AFF',
  },
  deleteText: {
    color: 'red',
  },
  editContainer: {
    marginTop: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    minHeight: 80,
    marginBottom: 8,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginMessage: {
    ...typography.regular,
    fontSize: 16,
    top: '40%',
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  emptyMessage: {
    ...typography.regular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
