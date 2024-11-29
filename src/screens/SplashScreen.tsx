import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { splash } from '../constants/image';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={splash} 
        style={styles.splashImage}
      />
    
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode:'cover', 
  }
});
