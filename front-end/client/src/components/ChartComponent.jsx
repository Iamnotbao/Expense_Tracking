import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';

const ChartComponent = () => {
    const chartRef = useRef(null); // Sử dụng useRef để tạo tham chiếu đến canvas element

    useEffect(() => {

        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 },
        ];


        new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Expenses by Year',
                        data: data.map(row => row.count),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                   
                    y: {
                        beginAtZero: true,
                    },
                },
                animation: true,
            },
        });
            console.log(new Date());
        return () => {
            if (chartRef.current) {
                chartRef.current.chartInstance.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef} id="acquisitions"></canvas>;
};

export default ChartComponent;
