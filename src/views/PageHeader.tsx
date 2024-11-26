import type {PropsWithChildren} from 'react';
import {
    Text,
    View,
    } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import styles from "../styles/itemStyles"; 
import { ItemProps } from '../views/ItemComp';

export type PageHeaderProps = PropsWithChildren<{
    title: ItemProps,
    previousItems: ItemProps[],
    onPressFnc: (numItems: Int32) => void
}>;

export function PageHeader({title, previousItems, onPressFnc}: PageHeaderProps): React.JSX.Element {

    function removeLastItem(item: ItemProps) {
        let index = previousItems.length - 1;
        for(let i = previousItems.length - 1; i >= 0; i--) {
        if (previousItems[index].label != item.label){
            index--;
        } else {
            break;
        }
        }
        onPressFnc(index);
    }

    function generatePreviousItemsView (item: ItemProps) {
        return (
        <Text key={item.label} style={styles.previousItem} onPress={() => removeLastItem(item)}>
            {item.label}
        </Text>
        );
    }
    return (
        <View style={styles.headerContainer}>
        <View style={{ 
            flexDirection: 'row'
        }}>
            {previousItems.map((item) => generatePreviousItemsView(item))}
        </View>
        <Text style={styles.headerItem}>
            {title.label}
        </Text>
        </View> 
    )
}