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
  BackHandler 
} from 'react-native';
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
    "Items List": {
      "test input 2": "123",
      "test input 3": "456"
    },
    "Item 4": "test",
    "Test Input": "Woot"
  }

  const allItems = menus;

  const [data, setData] = useState(itemData);
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

  function setActualData(dataObj: any, dataKey: any, dataVal: any, iStart: any) {
    let currentData = dataObj as any;
    if (iStart < dataPath.length) {
      for (let i = iStart; i < dataPath.length; i++) {
        Object.entries(data).forEach((key, val) => {
          console.log(key);
          if (key[0] == dataPath[i]) {
            currentData[key[0]] = setActualData(key[1], dataKey, dataVal, i + 1);
            i = dataPath.length;
          }
        });
      } 
    } else {
      currentData[dataKey] = dataVal;
      return currentData;
    }
    if (iStart == 0) {
      setData(currentData);
    }
  }

  function getActualData(dataKey: any) {
    let currentData = data as any;
    for (let i = 0; i < dataPath.length; i++) {
      Object.entries(data).forEach((key, val) => {
        if (key[0] == dataPath[i]) {
          currentData = key[1];
        }
      });
    } 
    return currentData[dataKey];
  }


  return (
    <DataContext.Provider 
      value={{
        data,
        setData: (key: any, val: any) => setActualData(data, key, val, 0)
      }}>
      <SafeAreaView style={{backgroundColor: false ? "black" : "lightgrey"}}>
        <PageHeader title={titleItem as any} previousItems={previousItemArray} onPressFnc={goBackXItems}>

        </PageHeader>
        <ScrollView>
          {currentItems.map((item) => <ItemComp label={item.label} 
            key={item.label}
            typeOfItem={item.typeOfItem}
            items={item.items as []}
            context={DataContext}
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
