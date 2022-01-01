import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
  Text
} from 'react-native';
import styles from '../utils/styles';
import {useNavigation} from '@react-navigation/native';

import imagePlaceholder from '../assets/image404.png';

const Item = ({id, name, language, schedule, type, image}) => (
  <SafeAreaView style={styles.card}>
    {image ? (
      <Image
        source={{uri: image.medium}}
        style={{
          width: 64,
          height: 64
        }}
      />
    ) : (
      <Image
        source={imagePlaceholder}
        style={{
          width: 64,
          height: 64
        }}></Image>
    )}

    <View style={{paddingLeft: 6, backgroundColor: 'none', flexWrap: 'wrap'}}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode={'head'}>
        {name}
      </Text>
      <Text style={styles.subtitle}>
        {' '}
        {type} | {language}{' '}
      </Text>
    </View>
  </SafeAreaView>
);

function ShowList(props) {
  const navigation = useNavigation();

  const handleOnPress = (item) => {
    navigation.navigate('Show', {item});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleOnPress(item)}>
      <Item
        id={item.id}
        name={item.name}
        language={item.language}
        type={item.type}
        schedule={item.schedule}
        status={item.status}
        image={item.image}></Item>
    </TouchableOpacity>
  );
  const keyExtractor = (item) => item.id.toString();

  return (
    <FlatList
      style={{width: '95%'}}
      data={props.shows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}

export default ShowList;
