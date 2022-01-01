import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: '10%'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    marginBottom: 5
  },
  title: {
    fontSize: 16,
    fontWeight: '200',
    marginLeft: 5
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777672',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    textAlign: 'left'
  },
  para: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 8
  }
});

export default styles;
