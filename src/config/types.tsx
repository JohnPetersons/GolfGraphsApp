
import type {Context, PropsWithChildren} from 'react';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export type DataContextType = {
    data: AppDataType,
    setData: (dataKey: string[], item: AppDataType) => void
}  

export type AppDataType = any;

export type MenuStructureType = {
    label: string,
    typeOfItem: string,
    fncs: any,
    dataKey: string[],
    items: MenuStructureType[]
}

export type TitleItemType = {
    label: string,
    items: MenuStructureType[]
}

export type ItemFncsType = {
    titleOnPressFnc: (item: ItemProps) => void,
    currentItemsOnPressFnc: (items: AppDataType) => void
    getActualData: (dataKey: string[]) => AppDataType
}

export type PageHeaderProps = PropsWithChildren<{
    title: TitleItemType,
    previousItems: ItemProps[],
    onPressFnc: (numItems: Int32) => void
}>;

export type ItemProps = PropsWithChildren<{
    label: string,
    items: ItemProps[],
    typeOfItem: string,
    dataKey: string[],
    context: Context<DataContextType>,
    fncs: ItemFncsType
}>;

export type ItemInlineInputProps = PropsWithChildren<{
    label: string,
    itemData: string,
    setItemData: (val: string) => void,
    fncs: ItemFncsType
}>;

export type ScatterPlotGraphProps = PropsWithChildren<{
    label: string,
    data: AppDataType
}>;
