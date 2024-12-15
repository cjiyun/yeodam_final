import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { showToastMessage } from '../../../common/utils';
import { restaurantReview } from '../../../types/typeInterfaces';

export default function RestaurantReviewSection({ restId }: { restId: string }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<restaurantReview[]>([]);
    const [content, setContent] = useState('');

    // 리뷰 목록 가져오기
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${EXPO_PUBLIC_API_URL}/restaurants/${restId}/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error('리뷰 로딩 실패:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [restId]);

    // 리뷰 작성 처리
    const handleSubmitReview = async () => {
        if (!user) {
            showToastMessage('로그인 후 이용 가능합니다');
            return;
        }

        if (!content.trim()) {
            showToastMessage('리뷰 내용을 입력해주세요');
            return;
        }

        try {
            await axios.post(`${EXPO_PUBLIC_API_URL}/restaurants/reviews`, {
                rest_id: restId,
                user_id: user.user_id,
                content: content.trim(),
                date: new Date().toISOString().split('T')[0]
            });
            
            setContent('');
            showToastMessage('리뷰가 등록되었습니다');
            fetchReviews();
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
            showToastMessage('리뷰 등록에 실패했습니다');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>리뷰</Text>
            
            {/* 리뷰 작성 폼 */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    placeholder="리뷰를 작성해주세요"
                    multiline
                />
                <Pressable 
                    style={styles.submitButton}
                    onPress={handleSubmitReview}
                >
                    <Text style={styles.submitButtonText}>등록</Text>
                </Pressable>
            </View>

            {/* 리뷰 목록 */}
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.rest_rev_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.reviewItem}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.nickname}>{item.nickname}</Text>
                            <Text style={styles.date}>
                                {new Date(item.date).toLocaleDateString()}
                            </Text>
                        </View>
                        <Text style={styles.content}>{item.content}</Text>
                    </View>
                )}
                refreshing={false}
                onRefresh={fetchReviews}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        minHeight: 100,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    reviewItem: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    nickname: {
        fontWeight: 'bold',
    },
    content: {
        marginBottom: 8,
    },
    date: {
        color: '#666',
        fontSize: 12,
    }
});