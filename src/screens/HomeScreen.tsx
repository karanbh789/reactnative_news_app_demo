import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import baseFile, {api_key, baseUrl} from '../api-config/baseFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {placeHolderImage} from '../constants/image';
import {useDispatch, useSelector} from 'react-redux';
import {RootStoreState} from '../redux/store.types';
import {storeNews} from '../redux/NewsSlice';

const HomeScreen = ({navigation}) => {
  const articles = useSelector((state: RootStoreState) => state.news.news);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/v2/top-headlines`, {
        params: {
          country: 'us',
          // category:'business',
          apiKey: api_key,
        },
      });

      console.log(' fetching news:', response);
      dispatch(storeNews(response?.data?.articles));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  // Check network status and load articles
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setOffline(false);
        fetchNews();
      } else {
        setOffline(true);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading News...</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    const imageSource = item.urlToImage
      ? {uri: item.urlToImage}
      : placeHolderImage;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('NewsDetailsScreen', {article: item})
        }>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.description || 'No description available.'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={styles.container}>
        <Text style={styles.heading}>News Feed Screen</Text>
        {offline && (
          <Text style={styles.offlineIndicator}>You are offline</Text>
        )}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading News...</Text>
          </View>
        ) : (
          <FlatList
            data={articles}
            keyExtractor={index => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListEmptyComponent={
              <View style={styles.centeredContainer}>
                <Text style={styles.errorText}>No articles available.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 48,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    color: '#ff0000',
    fontWeight: '600',
    textAlign: 'center',
  },
  offlineIndicator: {
    backgroundColor: '#ffcccb',
    color: '#900',
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 4,
  },
  heading: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 12,
  },
  heading1: {
    fontSize: 20,
    color: Colors.black,
    marginTop: 10,
    marginHorizontal: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
