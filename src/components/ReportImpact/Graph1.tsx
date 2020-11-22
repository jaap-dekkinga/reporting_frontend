import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

type graph1ItemT = {
    value: number,
    date: string
};
type dataGraph1T = {
    heard: graph1ItemT[],
    interested: graph1ItemT[],
};

type dataSetT = {
    label: string,
    backgroundColor: string,
    order: number,
    data: number[]
};
type graphDataT = {
    labels: string[],
    datasets: dataSetT[]
};

export default ({ data }: { data: dataGraph1T }) => {
    const graphData: graphDataT = {
        labels: [],
        datasets: []
    };

    graphData.labels = data.heard.map(el => format(new Date(el.date), 'YYY-MM-dd'));
    graphData.datasets.push({
        label: 'heard',
        order: 2,
        backgroundColor: 'rgba(142, 195, 167)',
        data: data.heard.map(el => el.value)
    });
    graphData.datasets.push({
        label: 'interested',
        order: 1,
        backgroundColor: 'rgba(220, 83, 86)',
        data: data.interested.map(el => el.value)
    });
    
    const options = {
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90
                }
            }]
        }
    };

    return (
        <Line data={graphData} options={options} />
    )
}