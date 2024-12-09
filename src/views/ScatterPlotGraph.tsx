import {
    useState
    } from 'react';
import {
    Text,
    View,
    } from 'react-native';
import type {Context, PropsWithChildren} from 'react';
import{Circle,Svg}from'react-native-svg';
import styles from "../styles/itemStyles"; 
import { ItemComp, ItemProps } from './ItemComp';
import { DataContextType } from '../../App';

export type ScatterPlotGraphProps = PropsWithChildren<{
    label: string,
    data: any
}>;

export function ScatterPlotGraph({label, data}: ScatterPlotGraphProps): React.JSX.Element {

    const [expanded, toggleExpansion] = useState(false);
    const graphData = data;

    function showOrHideExpansion() {
        if (expanded) {
        toggleExpansion(false);
        } else {
        toggleExpansion(true);
        }
    }

    const graphHeader = (
        <View style={styles.itemContainer}>
            <View style={styles.itemBuffer}></View>
            <Text style={styles.itemLabel} onPress={showOrHideExpansion}>
                {label}
            </Text>
        </View>);

    let graph = (
        <View></View>
    );

    if (expanded) {
        let circles = [];
        for (const index in graphData) {
            circles.push({
                key: "circle" + index,
                x: (graphData as any)[index].x,
                y: (graphData as any)[index].y
            })
        }
        const svg = (
            <Svg style={styles.svgContainer}>
                {circles.map((circle) => 
                    <Circle 
                        key={circle.key}
                        cx={circle.x}
                        cy={circle.y}
                        r="5"
                        fill="red"
                    />)
                }
            </Svg>
        )
        graph = (
            <View>
                {svg}
            </View>
        )
    }

    return (
        <View style={styles.generalContainer}>
            {graphHeader}
            {graph}
        </View>
    )
}