import {
    useState,
    useContext
    } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    } from 'react-native';
import type {PropsWithChildren} from 'react';
import styles from "../styles/itemStyles"; 

export type ItemInlineInputProps = PropsWithChildren<{
    label: string,
    itemData: string,
    setItemData: (val: string) => void,
    fncs: any
}>;

export function ItemInlineInput({label, itemData, setItemData, fncs}: ItemInlineInputProps): React.JSX.Element {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemBuffer}></View>
            <Text style={styles.itemLabel}>
            {label}
            </Text>
            <TextInput style={styles.itemInput} onChangeText={setItemData}>{itemData}</TextInput>
        </View>
    );
}