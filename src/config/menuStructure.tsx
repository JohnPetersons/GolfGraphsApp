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
        dataKey: ["TestInputabc"],
        fncs: {
            // getDataKey: () => ["TestInputabc"]
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
        dataKey: ["testinput2"],
        fncs: {
            // getDataKey: () => ["testinput2"]
            // getDataFnc: () => data,
            // setDataFnc: setData
        }
    },{
        label: "test input 3",
        typeOfItem: "inlineInput",
        items: [],
        dataKey: ["testinput3"],
        fncs: {
            // getDataKey: () => ["testinput3"]
            // getDataFnc: () => data,
            // setDataFnc: setData
        }
    }],
    dataKey: "ItemsList"
},{
    label: "Item 4",
    typeOfItem: "inlineInput",
    items: [],
    dataKey: ["Item4"]
},{
    label: "List Item Test",
    typeOfItem: "list",
    items: [{
        label: "List Item Inner Item",
        typeOfItem: "inlineInput",
        items:[],
        dataKey: ["testListInput"]
    }],
    dataKey: ["ItemListTest"]
}];