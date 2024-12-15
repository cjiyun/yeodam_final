import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import TabNavigator from './TabNavigator';
import HomeScreen from '../components/Home';
import SearchScreen from '../components/search';
import DestinationScreen from '../components/detailPage/destination/destDetails';
import WishListPage from '../components/wish/wishListPage';
import MytripPage from '../components/MyReviews';
import { RouteProp } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StackNavigator<RootStackParamList>() {
  const navigation = useNavigation<NavigationProp>();
  // 중간 생략 StackNavigator 렌더 부분
  return (
    <Stack.Navigator
      initialRouteName='TabNavigator'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='TabNavigator'
        component={TabNavigator}
      />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='search'
        component={SearchScreen}
        options={{ title: '검색' }}
      />
      <Stack.Screen
        name='destination'
        component={DestinationScreen}
        options={({ route }) => ({
          title: (route.params as { dest_id: string }).dest_id
        })}
      />
      <Stack.Screen
        name='wishList'
        component={WishListPage}
        options={{ title: '가보고 싶은 장소' }}
      />
      <Stack.Screen
        name='MytripPage'
        component={MytripPage}
        options={{ title: '여행 기록' }}
      />
    </Stack.Navigator>
  );
}