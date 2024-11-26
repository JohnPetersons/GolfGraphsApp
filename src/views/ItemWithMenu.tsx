import type {PropsWithChildren} from 'react';
import {
    Text,
    View,
    } from 'react-native';
import { ItemProps } from './ItemComp';
import styles from "../styles/itemStyles"; 

export type ItemWithMenuProps = PropsWithChildren<{
    label: string,
    items: ItemProps[],
    typeOfItem: string,
    fncs: {
        titleOnPressFnc: (item: ItemProps) => void,
        currentItemsOnPressFnc: (items: ItemProps[]) => void
    }
}>;

export function ItemWithMenu ({label, items, fncs}: ItemWithMenuProps): React.JSX.Element {

    function onPressItemWithMenu() {
        fncs.titleOnPressFnc({
        label: label,
        items: items
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