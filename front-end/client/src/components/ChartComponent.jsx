import React, { useState, useRef, useEffect } from 'react';
import { Chart } from 'chart.js';
import axios from 'axios';

const ChartComponent = (props) => {
    const chartRef = useRef(null); // Sử dụng useRef để tạo tham chiếu đến canvas element
    const chartInstanceRef = useRef(null);
    const token = sessionStorage.getItem("token");
    const [chartData, setChartData] = useState([]);
    const expense = props.Expense;
    useEffect(() => {
        console.log("check expense", props.Expense);
        const groupedData = {};
        for (const item of expense) {
            const { paymentDate, amount } = item.expense;
            let expenseYear = new Date(paymentDate).getFullYear();
            if (groupedData[expenseYear]) {
                groupedData[expenseYear] += amount;
            } else {
                groupedData[expenseYear] = amount;
            }
        }
        console.log("check expense ", expense);
        const processedData = Object.keys(groupedData)
            .map(expenseYear => ({
                expenseYear: parseInt(expenseYear, 10),
                amount: groupedData[expenseYear],
            }))
            .sort((a, b) => a.year - b.year);
        setChartData(processedData);

    }, [expense]);


    useEffect(() => {
        if(chartData.length==0) return;
        chartInstanceRef.current = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: chartData.map(row => row.expenseYear),
                datasets: [
                    {
                        label: 'Expenses by Year',
                        data: chartData.map(row => row.amount),
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
        // console.log(new Date());
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    },);

    return <canvas ref={chartRef} id="acquisitions"></canvas>;
};

export default ChartComponent;
