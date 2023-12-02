import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { PieChart } from '@mui/x-charts/PieChart';

import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
const series = [
    {
        type: 'bar',
        stack: '',
        yAxisKey: 'eco',
        data: [2, 5, 3, 4, 1],
    },
    {
        type: 'bar',
        stack: '',
        yAxisKey: 'eco',
        data: [5, 6, 2, 8, 9],
    },
    {
        type: 'line',
        yAxisKey: 'pib',
        color: 'red',
        data: [1000, 1500, 3000, 5000, 10000],
    },
];
function Analytics(props) {
    return (
        <div className='flex justify-between'>
            {/* <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['bar A', 'bar B', 'bar C'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [2, 5, 3],
                    },
                ]}
                width={500}
                height={300}
            /> */}
            <div>
                <h4>Trend</h4>
                <ChartContainer
                    series={series}
                    width={500}
                    height={400}
                    xAxis={[
                        {
                            id: 'years',
                            data: [2010, 2011, 2012, 2013, 2014],
                            scaleType: 'band',
                            valueFormatter: (value) => value.toString(),
                        },
                    ]}
                    yAxis={[
                        {
                            id: 'eco',
                            scaleType: 'linear',
                        },
                        {
                            id: 'pib',
                            scaleType: 'log',
                        },
                    ]}
                >
                    <BarPlot />
                    <LinePlot />
                    <ChartsXAxis label="Years" position="bottom" axisId="years" />
                    <ChartsYAxis label="Results" position="left" axisId="eco" />
                    <ChartsYAxis label="PIB" position="right" axisId="pib" />
                </ChartContainer>
            </div>

            <div>
                <h4>Amount of work</h4>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'project 1' },
                                { id: 1, value: 15, label: 'project 2' },
                                { id: 2, value: 20, label: 'project 3' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>

        </div>
    )
}

export default Analytics

