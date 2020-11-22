import React, { useRef, useEffect } from 'react';
import D3Funnel from 'd3-funnel';

type dataT = {
    label: string;
    value: number;
}[];

type dataGraph2T = {
    acted: number,
    heard: number,
    interested: number,
    shared: number,
    [key: string]: number,
};

export default ({ data }: { data: dataGraph2T }) => {
    const graphRef = useRef<HTMLDivElement | null>(null);

    const graphData: dataT = [];

    for (let el in data) {
        graphData.push({
            label: el,
            value: data[el]
        });
    }
    
    const options = {
        block: {
            dynamicHeight: true,
            barOverlay: false,
            minHeight: 15,
            fill: {
                scale: ['#8ec3a7', '#dc5356', '#f0cb69', '#5fb7e5'],
            },
        },
        chart: {
            height: 300,
            bottomPinch: 2,
            bottomWidth: 1/4,
        }
    };

    useEffect(() => {
        const chart = new (D3Funnel as any)(graphRef.current);
        chart.draw(graphData, options);
    });

    return (
        <div ref={graphRef}></div>
    )
}