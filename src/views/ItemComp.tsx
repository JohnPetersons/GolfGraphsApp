import type {PropsWithChildren} from 'react';
import { ItemWithMenu } from './ItemWithMenu';
import { ItemWithExpansion } from './ItemWithExpansion';
import { ItemInlineInput } from './ItemInlineInput';
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
*/

type ItemProps = PropsWithChildren<{
    label: string,
    items: ItemProps[],
    typeOfItem: string,
    fncs: any
}>;

export function ItemComp({label, items, typeOfItem, fncs}: ItemProps): React.JSX.Element {
    if (typeOfItem == "exp") {
        return (
        <ItemWithExpansion key={label} label={label} items={items} typeOfItem={typeOfItem} fncs={fncs}></ItemWithExpansion>
        );
    } else if (typeOfItem == "inlineInput") {
        return <ItemInlineInput key={label} label={label} fncs={fncs}></ItemInlineInput>
    } else {
        return (
        <ItemWithMenu key={label} label={label} items={items} typeOfItem={typeOfItem} fncs={fncs}></ItemWithMenu>
        );
    }
}

export type { ItemProps };