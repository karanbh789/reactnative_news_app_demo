import { Alert, Button, Image, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { backIcon, placeHolderImage, shareIcon } from '../constants/image';

const NewsDetailsScreen = ({ route }) => {
  const { article } = route.params;  

  const navigation = useNavigation();

  const shareNews = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.description}\n\nRead more: ${article.url}`,
        title: article.title,
      });
    } catch (error) {
      console.log('Error sharing the article.');
    }
  };
  const imageSource = article.urlToImage
  ? { uri: article.urlToImage }
  : placeHolderImage; 




  return (
    <SafeAreaView>
      <ScrollView >
    <View style={styles.container}>
         <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
         <Image source={backIcon} style={styles.shareButtonText}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareNews}>
          <Image source={shareIcon} style={styles.shareButtonText}/>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal:8}}>
      <Text style={styles.heading}>{article.title}</Text>
      <Text style={styles.authorText}>{article.author}</Text>
      <Image
        source={imageSource} 
        style={styles.detailsImage}
        resizeMode="cover" 
       
      />
     <Text style={styles.detailsDescription}>
          {article.description || 'No description available.'} 
        </Text>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export default NewsDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 48,
    backgroundColor: '#f5f5f5',
  },
  toolbar: {
    paddingHorizontal:8,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  backButtonText: {
    color: '#000',
    fontSize: 38,
    fontWeight:800
  },
  shareButtonText: {
    marginTop:16,
    height:24,
    width:24
  },
  heading: {
    fontSize: 22,
    color: Colors.black,
    marginTop: 24,
    fontWeight:600,
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
    padding:8,
    backgroundColor: '#fff',
  },
  detailsImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.black,
    marginBottom: 20,
  },
  authorText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#696969',
    marginBottom: 20,
  },

})