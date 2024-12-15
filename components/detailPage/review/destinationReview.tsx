import { EXPO_PUBLIC_API_URL } from '@env';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { showToastMessage } from '../../../common/utils';
import axios from 'axios';

interface Review {
    dest_rev_id: number;
    dest_id: string;
    user_id: string;
    content: string;
    date: string;
    created_at: string;
    nickname: string;
}

export default function ReviewSection({ destId }: { destId: string }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [content, setContent] = useState('');

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${EXPO_PUBLIC_API_URL}/reviews/${destId}`);
            setReviews(response.data);
        } catch (error) {
            console.error('리뷰 로딩 실패:', error);
        }
    };

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
            await axios.post(`${EXPO_PUBLIC_API_URL}/reviews`, {
                dest_id: destId,
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

            <FlatList
                data={reviews}
                keyExtractor={(item) => item.dest_rev_id.toString()}
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
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginRight: 8,
    },
    submitButton: {
        padding: 8,
        backgroundColor: '#007AFF',
        borderRadius: 4,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    reviewItem: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    nickname: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    content: {
        fontSize: 14,
        marginBottom: 8,
    },
});
