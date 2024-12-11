import type {PropsWithChildren} from 'react';
import {
    Text,
    View,
    } from 'react-native';
import { ItemProps } from '../config/types';
import styles from "../styles/itemStyles"; 

export function ItemWithMenu ({label, items, dataKey, fncs}: ItemProps): React.JSX.Element {

    function onPressItemWithMenu() {
        fncs.titleOnPressFnc({
        label: label,
        items: items,
        dataKey: dataKey,
        fncs: fncs
        } as ItemProps);
        fncs.currentItemsOnPressFnc(items);
    }

    return (
        <View style={styles.itemContainer}>
        <View style={styles.itemBuffer}></View>
        <Text style={styles.itemLabel} onPress={onPressItemWithMenu}>
            {label}
        </Text>
        </View>
    );
}