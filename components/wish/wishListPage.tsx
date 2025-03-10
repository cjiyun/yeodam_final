import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { getWishList, handleWishClick } from './wishListProcess';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { destination } from '../../types/typeInterfaces';
import { showToastMessage } from '../../common/utils';
import { typography } from '../../styles/typography';
import Header from '../../components/Header';
import { commonStyles } from '../../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockDestinations } from '../../constants/mockData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const IMAGE_MAPPING: { [key: string]: any } = {
  '1': require('../../assets/images/N-Seoul-tower.jpeg'),
  '2': require('../../assets/images/jeonju.jpeg'),
  '3': require('../../assets/images/pubao.png'),
  '4': require('../../assets/images/nam2.png'),
  '5': require('../../assets/images/sulak.png'),
  '6': require('../../assets/images/toham.png'),
  '7': require('../../assets/images/hadong.png'),
  '8': require('../../assets/images/kanu.png'),
};

export default function WishListPage() {
    const { user } = useAuth();
    const [wishListItems, setWishListItems] = useState<destination[]>([]);
    const navigation = useNavigation<NavigationProp>();

    // 찜 목록 데이터 가져오기
    const fetchWishListData = async () => {
        if (!user?.user_id) {
            showToastMessage('로그인이 필요한 서비스입니다.');
            return;
        }

        try {
            const wishList = await getWishList(user.user_id);
            const wishedDestinations = mockDestinations.filter(dest => 
                wishList.dest_list.includes(dest.dest_id)
            );
            setWishListItems(wishedDestinations);
        } catch (error) {
            console.error('찜 목록 로딩 실패:', error);
            showToastMessage('찜 목록을 불러오는데 실패했습니다');
        }
    };

    useEffect(() => {
        fetchWishListData();
    }, [user?.user_id]);

    const handleDestinationClick = (destination: destination) => {
        navigation.navigate('destination', { dest_id: destination.dest_id });
    };

    const handleWishRemove = async (destId: string) => {
        if (!user?.user_id) return;
        await handleWishClick(destId, user.user_id);
        setWishListItems(prev => prev.filter(item => item.dest_id !== destId));
    };

    if (!user?.user_id) {
        return (
            <View style={commonStyles.container}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.message}>로그인 후에 이용 가능합니다</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={wishListItems}
                keyExtractor={(item) => item.dest_id}
                renderItem={({ item }) => (
                    <Pressable 
                        style={styles.itemContainer}
                        onPress={() => handleDestinationClick(item)}
                    >
                        <Image 
                            source={IMAGE_MAPPING[item.dest_id] || require('../../assets/images/default-image.jpeg')}
                            style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{item.dest_name}</Text>
                            <Pressable 
                                style={styles.wishButton}
                                onPress={() => handleWishRemove(item.dest_id)}
                            >
                                <AntDesign name="heart" size={24} color="#eb4b4b" />
                            </Pressable>
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text style={styles.message}>찜한 여행지가 없습니다</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
    },
    infoContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
    },
    wishButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
    },
    message: {
        ...typography.regular,
        fontSize: 16,
        top: '40%',
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    }
});
