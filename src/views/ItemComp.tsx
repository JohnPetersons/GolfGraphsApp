import {
    useState,
    useContext,
    createContext
    } from 'react';
import {
    View,
    Text,
    } from 'react-native';
import type {Context, PropsWithChildren} from 'react';
import { ItemWithMenu } from './ItemWithMenu';
import { ItemWithExpansion } from './ItemWithExpansion';
import { ItemInlineInput } from './ItemInlineInput';
import styles from "../styles/itemStyles"; 
import { DataContextType } from '../../App';
import { ItemWithList } from './ItemWithList';
/*
    Types of items:
    "exp": expansion
        the menu will expand under the selected item
    "menu": menu
        the menu will be opened up as a new menu, the previous menu will become the page header,
        and the previous page header will be added to the back bar
    "inlineInput": will have an input field of some type defined by the fncs inline with the label
    "inputField": will have an input field of some type defined by the fncs underneath the label
        similar to how expansion shows it
    "list"
*/

type ItemProps = PropsWithChildren<{
    label: string,
    items: ItemProps[],
    typeOfItem: string,
    dataKey: string,
    context: Context<DataContextType>,
    fncs: any
}>;

export function ItemComp({label, items, typeOfItem, dataKey, fncs, context}: ItemProps): React.JSX.Element {
    const {data, setData} = useContext(context);
    let item = <View></View>;
    if (typeOfItem == "exp") {
        item = (<ItemWithExpansion key={label} label={label} items={items} dataKey={dataKey} typeOfItem={typeOfItem} fncs={fncs} context={context}></ItemWithExpansion>);
    } else if (typeOfItem == "inlineInput") {
        const itemData = fncs.getActualData(dataKey);
        const setItemData = (val: string) => {
            setData(dataKey, val);
        }
        item = (<ItemInlineInput label={label} itemData={itemData} setItemData={setItemData} fncs={fncs}></ItemInlineInput>);
    } else if (typeOfItem == "list") {
        item = (<ItemWithList typeOfItem={typeOfItem} key={label} label={label} items={items} dataKey={dataKey} fncs={fncs} context={context}></ItemWithList>)
    } else {
        item = (<ItemWithMenu key={label} label={label} items={items} dataKey={dataKey} typeOfItem={typeOfItem} fncs={fncs}></ItemWithMenu>);
    }
    return item;
}

export type { ItemProps };