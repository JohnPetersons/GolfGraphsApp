import type {PropsWithChildren} from 'react';
import {
    Text,
    View,
    } from 'react-native';
import { ItemWithMenu } from './ItemWithMenu';
import { ItemComp } from './ItemComp';
import { ItemProps } from '../config/types';
import styles from "../styles/itemStyles"; 

export function ItemWithList ({label, items, dataKey, fncs, context}: ItemProps): React.JSX.Element {

    const dataItems = [];
    const data = fncs.getActualData(dataKey);

    if (data != null) {
        for (const key in Object.keys(data)) {
            dataItems.push([dataKey[0], key]);
        }
    }

    return (
        <View>
            {dataItems.map((item: any) => <ItemComp dataKey={item} key={label + " " + item[1]} label={label + " " + item[1]} context={context}
            items={items} fncs={fncs} typeOfItem="menu"></ItemComp>)}
        </View>
    );
}