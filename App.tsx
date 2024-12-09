/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
import {
  useState,
  useEffect,
  useContext,
  createContext
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
import { ItemComp, ItemProps } from './src/views/ItemComp';
import { PageHeader } from './src/views/PageHeader';
import { menus } from './src/config/menuStructure';

export type DataContextType = {
  data: any,
  setData: any
}

const DataContext = createContext({} as DataContextType);

function App(): React.JSX.Element { 

  const itemData = {
    "datasetName": "testDataSet",
    "Items List": {
      "test input 2": "123",
      "test input 3": "456"
    },
    "Item 4": "test",
    "Test Input abc": "Woot"
  }

  let loadedData = "";

  const [loaded, setLoaded] = useState(false);

  try {
    if (!loaded) {
      AsyncStorage.getItem("testDataSet" as string).then((val) => {
        setLoaded(true);
        setData(val != null?JSON.parse(val as any):itemData);
      });
    }
  } catch (error) {
    console.log(error);
  }

  const allItems = menus;

  const [data, setData] = useState(loadedData);
  const [dataPath, setDataPath] = useState([] as any[]);
  const [previousItemArray, addPreviousItem] = useState([]);
  const [titleItem, setTitle] = useState({
    label: "Golf Graphs",
    items: allItems
  });
  const [currentItems, setCurrentItems] = useState(allItems);

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
    var labelArray = [];
    for (let i = 0; i < numItems; i++) {
      pia.push(previousItemArray[i] as ItemProps);
      labelArray.push((previousItemArray[i] as ItemProps).label);
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
      labelArray.push((previousItemArray[i] as ItemProps).label);
    }
    labelArray.push(item.label);
    pia.push(titleItem as any);
    setTitle(item as any);
    addPreviousItem(pia as []);
    setDataPath(labelArray);
  }

  function setActualData(dataKey: any, dataVal: any) {
    let currentData = data as any;
    for (let i = 0; i < dataKey.length - 1; i++) {
      if (Object.keys(currentData).includes(dataKey[i])) {
        currentData = currentData[dataKey[i]];
      }
    } 
    currentData[dataKey[dataKey.length - 1]] = dataVal;
    setData(data);
    saveData();
  }

  function getActualData(dataKey: any) {
    console.log(dataKey);
    let currentData = data as any;
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
        setData: (key: any, val: any) => setActualData(key, val)
      }}>
      <SafeAreaView style={{backgroundColor: false ? "black" : "lightgrey"}}>
        <View style={{height: 100}}></View>
        <PageHeader title={titleItem as any} previousItems={previousItemArray} onPressFnc={goBackXItems}>

        </PageHeader>
        <ScrollView>
          {currentItems.map((item: any) => <ItemComp label={item.label} 
            key={item.label}
            typeOfItem={item.typeOfItem}
            items={item.items as []}
            context={DataContext}
            fncs={{
              "titleOnPressFnc": addToPreviousItemArray,
              "currentItemsOnPressFnc":setCurrentItems,
              "getActualData": getActualData,
              "getDataKey": item.fncs.getDataKey
            }}></ItemComp>)}
        </ScrollView>
      </SafeAreaView>
    </DataContext.Provider>
  );
}

export default App;
