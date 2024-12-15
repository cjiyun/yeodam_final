import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { showToastMessage } from '../../../common/utils';

interface ReviewFormProps {
  type: 'destination' | 'restaurant';
  id: string;
  onSuccess: () => void;
}

export default function ReviewForm({ type, id, onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!user) {
      showToastMessage('로그인 후 이용 가능합니다');
      return;
    }

    if (!content.trim()) {
      showToastMessage('리뷰 내용을 입력해주세요');
      return;
    }

    try {
      const endpoint = type === 'destination' 
        ? `destinations/${id}/reviews`
        : `restaurants/${id}/reviews`;

      await axios.post(`${EXPO_PUBLIC_API_URL}/${endpoint}`, {
        user_id: user.user_id,
        content: content.trim(),
        date: new Date().toISOString().split('T')[0]
      });

      setContent('');
      showToastMessage('리뷰가 등록되었습니다');
      onSuccess();
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      showToastMessage('리뷰 등록에 실패했습니다');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="리뷰를 작성해주세요"
        multiline
      />
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
