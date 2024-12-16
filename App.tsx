/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';

/*

TODO:

be able to add to the data
be able to remove from the data
structure the data so it's not just test data anymore
grab the data for the graph
use accelerometer and gyroscope to get close enough data
  1) convert accelerometer and gyroscope data into real world direction of movement
  2) convert acceleration into current velocity
  3) keep track of 
    a) velocity from target line to ball position
    b) ball position to next ball position
  4) calculate distance from target point perpindicular to target line
  - pressing add target line start point adds another start line vector3 object to the position array
  - pressing add ball position adds another ball position vector3 object to the position array
  - the accelerometer always adds to the last element in the position array
  - the first swing is the total distance between the first ball position and the second
  - the first target line is the distance between the first ball position and the first target line position
  - the order to input is 
    - select ball position
      - either as a new shot or as on the green
    - select target line
    - hit ball
    - go to ball
    - enter other data on the way to the ball
    - repeat
  - if the velocity, after calculating it from acceleration, is below a certain threshold assume the phone is not moving
*/

import {
  useState,
  useEffect,
  useContext,
  createContext,
  SetStateAction
 } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Alert,
  BackHandler,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { ItemComp } from './src/views/ItemComp';
import { PageHeader } from './src/views/PageHeader';
import { menus } from './src/config/menuStructure';
import { ScatterPlotGraph } from './src/views/ScatterPlotGraph';
import styles from './src/styles/itemStyles';
import { AppDataType, DataContextType, ItemProps, MenuStructureType, TitleItemType } from './src/config/types';

const DataContext = createContext({} as DataContextType);

function App(): React.JSX.Element { 

  const itemData = {
    "datasetName": "testDataSet",
    "ItemsList": {
      "testinput2": "123",
      "testinput3": "456"
    },
    "Item4": "test",
    "TestInputabc": "Woot",
    "ItemListTest": {
      "default": {
        "testListInput": "default"
      },
      "0": {
        "testListInput": "0"
      },
      "1": {
        "testListInput": "1"
      }
    },
    "graphData": {
      0: {
        x: "0%",
        y: "20%"
      },
      1: {
        x: "100%",
        y: "75%"
      }
    }
  }
  let loadedData = "";

  const [loaded, setLoaded] = useState(false);

  try {
    if (!loaded) {
      AsyncStorage.getItem("testDataSet" as string).then((val) => {
        setLoaded(true);
        setData(itemData as any); // uncomment to reset on load
        const parsedVal = val != null?JSON.parse(val as any):itemData;
        // setData(parsedVal);
      });
    }
  } catch (error) {
    console.log(error);
  }

  const [data, setData] = useState(loadedData);

  

  const [dataPath, setDataPath] = useState([] as string[]);
  const [previousItemArray, addPreviousItem] = useState([]);
  const [titleItem, setTitle] = useState({
    label: "Golf Graphs",
    items: menus as MenuStructureType[]
  } as TitleItemType);
  const [currentItems, setCurrentItems] = useState(menus as MenuStructureType[]);

  function backActionHelper() {
    if (previousItemArray.length != 0) {
      goBackXItems(previousItemArray.length-1);
      return true;
    }
    
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  
  useEffect(() => {
    
    const backAction = () => {
      return backActionHelper();
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

  function goBackXItems(numItems: Int32) {
    var pia = [];
    var labelArray: string[] = [];
    for (let i = 0; i < numItems; i++) {
      pia.push(previousItemArray[i] as ItemProps);
      if ((previousItemArray[i] as ItemProps).dataKey != null) {
        labelArray.concat((previousItemArray[i] as ItemProps).dataKey);
      }
    }
    setTitle(previousItemArray[numItems]);
    setCurrentItems((previousItemArray[numItems] as ItemProps).items as [])
    addPreviousItem(pia as []);
    setDataPath(labelArray);
  }

  function addToPreviousItemArray(item: ItemProps) {
    var pia = [];
    var labelArray = dataPath;
    for (let i = 0; i < previousItemArray.length; i++) {
      pia.push(previousItemArray[i]);
    }
    if (item.dataKey != null) {
      for (let i = 0; i < item.dataKey.length; i++) {
        labelArray.push(item.dataKey[i]);
      }
    }
    pia.push(titleItem as TitleItemType);
    setTitle(item as TitleItemType);
    addPreviousItem(pia as []);
    setDataPath(labelArray);
  }

  function setActualData(dataKey: string[], dataVal: AppDataType) {
    let currentData = data as AppDataType;
    for (let i = 0; i < dataPath.length; i++) {
      if (Object.keys(currentData).includes(dataPath[i])) {
        currentData = currentData[dataPath[i]];
      }
    }
    for (let i = 0; i < dataKey.length - 1; i++) {
      if (Object.keys(currentData).includes(dataKey[i])) {
        currentData = currentData[dataKey[i]];
      }
    }
    currentData[dataKey[dataKey.length - 1]] = dataVal;
    setData(data);
    saveData();
  }

  function getActualData(dataKey: string[]) {
    let currentData = data as AppDataType;
    for (let i = 0; i < dataPath.length; i++) {
      if (Object.keys(currentData).includes(dataPath[i])) {
        currentData = currentData[dataPath[i]];
      }
    }
    for (let i = 0; i < dataKey.length - 1; i++) {
      if (Object.keys(currentData).includes(dataKey[i])) {
        currentData = currentData[dataKey[i]];
      }
    } 
    return currentData[dataKey[dataKey.length - 1]];
  }

  async function saveData() {
    try {
      await AsyncStorage.setItem(
        "testDataSet",
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <DataContext.Provider 
      value={{
        data,
        setData: (key: string[], val: AppDataType) => setActualData(key, val)
      }}>
      <SafeAreaView style={{backgroundColor: "black", height: "100%"}}>
        <View style={{height: 50}}></View>
        <PageHeader title={titleItem as TitleItemType} previousItems={previousItemArray} onPressFnc={goBackXItems}>

        </PageHeader>
        <ScrollView style={styles.generalContainer}>
        <ScatterPlotGraph label="Graph" data={(data as AppDataType).graphData}></ScatterPlotGraph>
          {currentItems.map((item: MenuStructureType) => <ItemComp label={item.label} 
            key={item.label}
            typeOfItem={item.typeOfItem}
            items={item.items as []}
            context={DataContext}
            dataKey={item.dataKey}
            fncs={{
              "titleOnPressFnc": addToPreviousItemArray,
              "currentItemsOnPressFnc":setCurrentItems,
              "getActualData": getActualData
            }}></ItemComp>)}
        </ScrollView>
      </SafeAreaView>
    </DataContext.Provider>
  );
}

export default App;
