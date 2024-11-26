import {
    StyleSheet,
    Dimensions,
  } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  
const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
  },
  headerItem: {
    width: windowWidth - 10,
    fontSize: 25,
    margin: 5,
    padding: 5
  },
  previousItem: {
    flex: 0,
    fontSize: 17,
    minWidth: (windowWidth / 3) - 10,
    maxWidth: (windowWidth / 3) - 10,
    margin: 5,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 2.5,
    borderColor: 'white',
    backgroundColor: 'white',
    overflow: 'hidden',
    maxHeight: 40
  },
  itemContainer: {
    flexDirection: 'row',
    width: windowWidth
  },
  itemBuffer: {
    flex: 0,
    minWidth: (windowWidth / 10),
    maxWidth: (windowWidth / 10)
  },
  itemLabel: {
    flex: 0,
    minWidth: (2 * windowWidth / 5) - 5,
    maxWidth: (2 * windowWidth / 5) - 5,
    fontSize: 17,
    margin: 2.5,
    padding: 2.5
  },
  itemInput: {
    flex: 0,
    minWidth: (2 * windowWidth / 5) - 5,
    maxWidth: (2 * windowWidth / 5) - 5,
    fontSize: 17,
    margin: 2.5,
    backgroundColor: "white"
  }
});

export default styles;