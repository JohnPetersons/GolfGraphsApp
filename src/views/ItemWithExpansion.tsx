import {
    useState
    } from 'react';
import {
    Text,
    View,
    } from 'react-native';
import type {Context, PropsWithChildren} from 'react';
import styles from "../styles/itemStyles"; 
import { ItemComp } from './ItemComp';
import { DataContextType, ItemProps } from '../config/types';

export function ItemWithExpansion({label, items, dataKey, fncs, context}: ItemProps): React.JSX.Element {

    const [expansionItems, toggleExpansion] = useState([] as ItemProps[]);

    function showOrHideExpansion() {
        if (expansionItems.length == 0) {
        toggleExpansion(items);
        } else {
        toggleExpansion([] as ItemProps[]);
        }
    }

    return (
        <View>
        <View style={styles.itemContainer}>
            <View style={styles.itemBuffer}></View>
            <Text style={styles.itemLabel} onPress={showOrHideExpansion}>
            {label}
            </Text>
        </View>
        <View style={{marginLeft: 10}}>
        {expansionItems.map((item) => { return (
            <ItemComp key={item.label} label={item.label} items={item.items} typeOfItem={item.typeOfItem}
            fncs={fncs} context={context} dataKey={dataKey}></ItemComp>
        );})}</View>
        </View>
    );
}