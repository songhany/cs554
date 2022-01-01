import React from 'react';
import {ScrollView, Text, View, Image, useWindowDimensions} from 'react-native';
import styles from '../utils/styles';
import HTML from 'react-native-render-html';
import imagePlaceholder from '../assets/image404.png';
import LinearGradient from 'react-native-linear-gradient';

const Show = ({route}) => {
  const imgPlaceholder = route.params
    ? {uri: route.params.item.image.original}
    : imagePlaceholder;
  const windowHeight = useWindowDimensions().height;

  if (route.params)
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View>
            <Image
              source={imgPlaceholder}
              resizeMethod="scale"
              style={{width: '100%', height: windowHeight * 0.7}}
            />

            <LinearGradient
              style={{
                position: 'absolute',
                bottom: 0,
                height: 150,
                width: '100%'
              }}
              colors={['rgba(255, 255, 255, 0)', '#f2f2f2']}></LinearGradient>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>
              {' '}
              {route.params ? <>{route.params.item.name}</> : null}{' '}
            </Text>
            <View>
              <Text style={styles.subtitle}>
                {' '}
                {route.params.item.type} | {route.params.item.language}{' '}
                {route.params.item.schedule.time ? (
                  <>| {route.params.item.schedule.time}</>
                ) : null}{' '}
              </Text>
            </View>

            {/*<WebView originWhitelist={['*']} style={{flex: 1}}  source={{ html: route.params.item.summary }} />
             */}

            <View style={{width: '85%', marginTop: 12}}>
              {route.params.item.summary ? (
                <HTML
                  html={route.params.item.summary}
                  style={{textAlign: 'center'}}></HTML>
              ) : (
                <Text style={{textAlign: 'center', fontSize: 16}}>
                  No summary available
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  else
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>
          Please select a tv show from home screen
        </Text>
      </View>
    );
};

export default Show;
