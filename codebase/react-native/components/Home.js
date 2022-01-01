import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import {grabTvShows} from '../utils/queries';
import styles from '../utils/styles';
import ShowList from './ShowList';

const Item = ({id, name, language, schedule, type, image}) => (
  <SafeAreaView style={styles.card}>
    <Image
      source={{uri: image.medium}}
      style={{
        width: 100,
        height: 100
      }}
    />

    <View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={StyleSheet.compose({flexShrink: 1}, styles.title)}
          numberOfLines={1}>
          {name}
        </Text>
      </View>
      <Text style={styles.subtitle}>
        {' '}
        {type} | {language} | {schedule.time}{' '}
      </Text>
    </View>
  </SafeAreaView>
);

const Home = ({navigation}) => {
  const [shows, setShows] = useState(null);
  const [loading, setLoading] = useState(true);

  async function init(pageNum = 1) {
    try {
      let {data} = await grabTvShows(pageNum);

      setShows(data);
      setLoading(false);
    } catch (e) {
      alert(JSON.stringify(e, '', 2));
      console.error(e);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const handleOnPress = (item) => {
    //alert('pressed')
    navigation.navigate('Show', {item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TV Maze</Text>
      {loading ? <Text>Loading ...</Text> : null}
      {shows ? <ShowList shows={shows}></ShowList> : null}
    </SafeAreaView>
  );
};

export default Home;
