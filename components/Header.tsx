import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginModal from '../auth/modals/LoginModal';
import { UserProfile } from '../types/auth';
import ProfileDropDown from '../auth/modals/ProfileDropDown';
import { typography } from '../styles/typography';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, setUser } = useAuth();
  const navigation = useNavigation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isFocused = useIsFocused();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setShowLoginModal(false);
    }
  }, [isFocused]);

  const handleLoginSuccess = async (userProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userProfile));
      setUser(userProfile);
      setShowLoginModal(false);
    } catch (error) {
      console.error('Login state update failed:', error);
      setShowLoginModal(false);
    }
  };

  return (
    <View style={styles.header}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <View style={styles.centerContent}>
          <Image 
            source={require('../assets/images/logo-icon.png')} 
            style={styles.logo} 
          />
          <Text style={styles.title}>여담</Text>
        </View>
      </View>

      {user ? (
        <View>
          <TouchableOpacity 
            style={styles.profileContainer}
            onPress={() => setShowDropdown(true)}
          >
            <Image 
              source={user.profile_image ? { uri: user.profile_image } : require('../assets/images/default-profile.png')} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
          <ProfileDropDown 
            setUserInfo={setUser}
            setIsLoggedIn={() => setUser(null)}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => setShowLoginModal(true)}
        >
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
      )}

      <LoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 40,
    marginRight: 8,
  },
  title: {
    ...typography.header,
    fontSize: 30,
    color: '#145C80',
  },
  loginButton: {
    backgroundColor: '#145C80',
    position: 'absolute',
    right: 10,
    borderRadius: 100,
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    ...typography.regular,
    color: '#ffffff',
    fontSize: 14,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
