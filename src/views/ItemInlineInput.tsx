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
import { DataContext } from '../../App';

export type ItemInlineInputProps = PropsWithChildren<{
    label: string,
    fncs: {
        // getDataFnc: () => string,
        // setDataFnc: (data: any) => string
    }
}>;

export function ItemInlineInput({label, fncs}: ItemInlineInputProps): React.JSX.Element {

    const {data, setData} = useContext(DataContext);

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemBuffer}></View>
            <Text style={styles.itemLabel}>
            {label}
            </Text>
            <TextInput style={styles.itemInput} onChangeText={setData}>{data}</TextInput>
        </View>
    );
}