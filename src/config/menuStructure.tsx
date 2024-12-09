import { ItemProps } from "../views/ItemComp";

export const menus = [{
    label: "Item 1",
    typeOfItem: "menu",
    fncs: {},
    items: [{
        label: "Item 1.1",
        typeOfItem: "exp",
        fncs: {},
        items: [{
        label: "Item 1.1.1",
        typeOfItem: "menu",
        fncs: {},
        items: []
        }]
    },{
        label: "Item 1.2",
        typeOfItem: "menu",
        fncs: {},
        items: []
    }]
    },{
    label: "Item 2",
    typeOfItem: "menu",
    fncs: {},
    items: [{
        label: "Item 2.1",
        typeOfItem: "menu",
        fncs: {},
        items: []
    },{
        label: "Item 2.2",
        typeOfItem: "menu",
        fncs: {},
        items: []
    }]
    },{
    label: "Item 3",
    typeOfItem: "menu",
    fncs: {},
    items: [{
        label: "Item 3.1",
        typeOfItem: "menu",
        fncs: {},
        items: []
    },{
        label: "Item 3.2",
        typeOfItem: "menu",
        fncs: {},
        items: []
    },{
        label: "Test Input",
        typeOfItem: "inlineInput",
        items: [],
        fncs: {
            getDataKey: () => ["Test Input abc"]
            // getDataFnc: () => data,
            // setDataFnc: setData
        }
    }]
},{
    label: "Items List",
    typeOfItem: "menu",
    items: [{
        label: "test input 2",
        typeOfItem: "inlineInput",
        items: [],
        fncs: {
            getDataKey: () => ["Items List", "test input 2"]
            // getDataFnc: () => data,
            // setDataFnc: setData
        }
    },{
        label: "test input 3",
        typeOfItem: "inlineInput",
        items: [],
        fncs: {
            getDataKey: () => ["Items List", "test input 3"]
            // getDataFnc: () => data,
            // setDataFnc: setData
        }
    }],
    fncs: {}
},{
    label: "Item 4",
    typeOfItem: "inlineInput",
    items: [],
    fncs: {
        getDataKey: () => ["Item 4"]
        // getDataFnc: () => data,
        // setDataFnc: setData
    }
}];