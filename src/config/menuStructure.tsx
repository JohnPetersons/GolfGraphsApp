import { ItemProps } from "../views/ItemComp";

export const menus = [{
    label: "Item 1",
    typeOfItem: "menu",
    items: [{
        label: "Item 1.1",
        typeOfItem: "exp",
        items: [{
        label: "Item 1.1.1",
        typeOfItem: "menu",
        items: []
        }]
    },{
        label: "Item 1.2",
        typeOfItem: "menu",
        items: []
    }]
    },{
    label: "Item 2",
    typeOfItem: "menu",
    items: [{
        label: "Item 2.1",
        typeOfItem: "menu",
        items: []
    },{
        label: "Item 2.2",
        typeOfItem: "menu",
        items: []
    }]
    },{
    label: "Item 3",
    typeOfItem: "menu",
    items: [{
        label: "Item 3.1",
        typeOfItem: "menu",
        items: []
    },{
        label: "Item 3.2",
        typeOfItem: "menu",
        items: []
    }]
}];