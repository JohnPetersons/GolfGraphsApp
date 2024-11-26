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

type DataContextType = {
  data: any,
  setData: (item: any) => void
}

export const DataContext = createContext({} as DataContextType);

function App(): React.JSX.Element {

  const [data, setData] = useState({
    item: "test"
  });

  const allItems = menus;

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
    for (let i = 0; i < numItems; i++) {
      pia.push(previousItemArray[i] as ItemProps);
    }
    setTitle(previousItemArray[numItems]);
    setCurrentItems((previousItemArray[numItems] as ItemProps).items as [])
    addPreviousItem(pia as []);
  }

  function addToPreviousItemArray(item: ItemProps) {
    var pia = [];
    for (let i = 0; i < previousItemArray.length; i++) {
      pia.push(previousItemArray[i]);
    }
    pia.push(titleItem as any);
    setTitle(item as any);
    addPreviousItem(pia as []);
  }


  return (
    <DataContext.Provider 
      value={{
        data, 
        setData}}>
      <SafeAreaView style={{backgroundColor: false ? "black" : "lightgrey"}}>
        <PageHeader title={titleItem as any} previousItems={previousItemArray} onPressFnc={goBackXItems}>

        </PageHeader>
        <ScrollView>
          {currentItems.map((item) => <ItemComp label={item.label} 
            key={item.label}
            typeOfItem={item.typeOfItem}
            items={item.items as []}
            fncs={{
              "titleOnPressFnc": addToPreviousItemArray,
              "currentItemsOnPressFnc":setCurrentItems
            }}></ItemComp>)}
        </ScrollView>
      </SafeAreaView>
    </DataContext.Provider>
  );
}

export default App;
