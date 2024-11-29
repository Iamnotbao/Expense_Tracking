import React, {useState, useRef, useEffect } from 'react';
import { Chart } from 'chart.js';

const Chart_Income = (props) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const baseURL = "http://localhost:5000/income";
    const token = sessionStorage.getItem("token");
    const [chartData, setChartData] = useState([]);
    const income = props.Income;
    useEffect(()=>{
        const groupedData = {}; 
        for (const item of income) {
            const { Year, amount } = item.income; 
                
            if (groupedData[Year]) {
                groupedData[Year] += amount; 
            } else {
                groupedData[Year] = amount; 
            }
        }
        const processedData = Object.keys(groupedData)
        .map(year => ({
            year: parseInt(year, 10),
            amount: groupedData[year],
        }))
        .sort((a, b) => a.year - b.year);

    setChartData(processedData);
    },[income])
    useEffect(() => {
        if (chartData.length === 0) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current= new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: chartData.map(item => item.year),
                datasets: [
                    {
                        label: 'Income by Year',
                        data: chartData.map(item => item.amount),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Year",
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Amount",
                        },
                    },
                },
                animation: true,
            },
        });
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, );

    return <canvas ref={chartRef} id="acquisitions"></canvas>;
};

export default Chart_Income;
