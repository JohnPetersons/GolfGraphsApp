import {useContext, useState, type PropsWithChildren} from 'react';
import {
    Text,
    View,
    } from 'react-native';
import { ItemWithMenu } from './ItemWithMenu';
import { ItemComp } from './ItemComp';
import { ItemProps } from '../config/types';
import styles from "../styles/itemStyles"; 

export function ItemWithList ({label, items, dataKey, fncs, context}: ItemProps): React.JSX.Element {
    const {data, setData} = useContext(context);
    const [updated, setUpdated] = useState(false);

    const dataItems = [];
    const listData = fncs.getActualData(dataKey);

    function addNewData() {
        listData[(Object.keys(listData).length - 1).toString()] = JSON.parse(JSON.stringify(listData["default"]));
        setData(dataKey, listData);
        setUpdated(true);
    }

    function removeData(index: string) {
        let item = 0;
        let result: any = {
            "default": listData["default"]
        }
        const keys = Object.keys(listData as Object);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] != "default" && keys[i] != index) {
                result[item.toString()] = JSON.parse(JSON.stringify(listData[keys[i].toString()]));
                item++;
            }
        }
        setData(dataKey, result);
        setUpdated(true);
    }

    if (listData != null) {
        const keys = Object.keys(listData as Object);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] != "default") {
                dataItems.push([dataKey[0], keys[i]]);
            }
        }
    }

    return (
        <View>
            {dataItems.map((item: any) => 
                <View key={label + " " + item[1]} >
                    <ItemComp dataKey={item} label={label + " " + item[1]} context={context}
                    items={items} fncs={fncs} typeOfItem="menu"></ItemComp>
                    <Text onPress={() => removeData(item[1])}>Remove Item</Text>
                </View>
            )}
            <Text onPress={addNewData}>Add new data</Text>
        </View>
    );
}