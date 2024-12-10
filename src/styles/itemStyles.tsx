import {
    StyleSheet,
    Dimensions,
  } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  
const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 10
  },
  headerContainer: {
    width: windowWidth,
    minHeight: 100,
    justifyContent: "flex-end",
    backgroundColor: "black"
  },
  headerItem: {
    width: windowWidth - 10,
    borderRadius: 5,
    fontSize: 25,
    margin: 5,
    padding: 5,
    color: "white"
  },
  previousItem: {
    flex: 0,
    fontSize: 17,
    minWidth: (windowWidth / 3) - 10,
    maxWidth: (windowWidth / 3) - 10,
    margin: 5,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 5,
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
    backgroundColor: "white",
    borderRadius: 5
  },
  svgContainer: {
    backgroundColor: "white",
    width: windowWidth - 50,
    height: 200,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    marginLeft: 25,
    marginRight: 25
  }
});

export default styles;