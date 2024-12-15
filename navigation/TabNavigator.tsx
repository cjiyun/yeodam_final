import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/Home';
import SearchScreen from '../components/search';
import WishListPage from '../components/wish/wishListPage';
import MytripPage from '../components/MyReviews';
import { AntDesign } from '@expo/vector-icons';
import { typography } from '../styles/typography';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#145C80',
        },
        tabBarLabelStyle: {
          ...typography.light,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#b8b8b8',
      }}
    >
      <Tab.Screen 
        name="홈" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" color={focused ? 'white' : '#b8b8b8'} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="검색" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="search1" color={focused ? 'white' : '#b8b8b8'} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="가보고 싶은 장소" 
        component={WishListPage} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="hearto" color={focused ? 'white' : '#b8b8b8'} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="여행 기록" 
        component={MytripPage} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="book" color={focused ? 'white' : '#b8b8b8'} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}