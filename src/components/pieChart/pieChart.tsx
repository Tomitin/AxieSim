import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import './pieChart.css';

interface Data {
    name: string;
    value: number;
}

interface PieChartComponentProps {
    containerHeight: string;
    pieChartRadius: number;
    data: Data[];
}
const COLORS = ['#8884d8', '#0088FE', '#FFBB28', '#00C49F'];

const PieChartComponent: React.FunctionComponent<PieChartComponentProps> = (props: PieChartComponentProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderLabel = (entry: any) => {
        const percentage = Math.round(entry.percent * 100);
        return `${entry.value}(${percentage}%)`;
    };

    return (
        <div className="pie-chart-component pie-chart-container" style={{ height: props.containerHeight }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={props.data}
                        cx="50%"
                        cy="50%"
                        outerRadius={props.pieChartRadius}
                        fill="#8884d8"
                        label={renderLabel}
                    >
                        {props.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" align="left" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
