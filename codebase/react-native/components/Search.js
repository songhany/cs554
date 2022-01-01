import React from 'react';
import {useState} from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import styles from '../utils/styles';
import {doSearch} from '../utils/queries';
import ShowList from './ShowList';

const transformArr = (arr) => arr.map((k, i, a) => k.show);

const Search = ({route}) => {
  const [shows, setShows] = useState(null);
  const [search, setSearch] = useState('yo');
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch() {
    try {
      setLoading(true);
      let {data: res} = await doSearch(search);
      setLoading(false);
      setShows(transformArr(res));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search </Text>
      <TextInput
        onChangeText={(val) => setSearch(val)}
        style={{width: '80%', height: 40, borderWidth: 1, borderRadius: 25}}>
        {' '}
      </TextInput>
      <Text>{'\n'}</Text>
      <Button
        style={{borderRadius: 15, marginTop: 10}}
        onPress={() => handleSearch()}
        title="Search"></Button>
      {loading == false && shows && shows.length == 0 ? (
        <Text style={StyleSheet.compose(styles.title, {marginTop: 50})}>
          {' '}
          No Shows found{' '}
        </Text>
      ) : null}
      {loading == true ? <Text>Loading...</Text> : null}
      {loading == false && shows ? <ShowList shows={shows}></ShowList> : null}
    </SafeAreaView>
  );
};

export default Search;
