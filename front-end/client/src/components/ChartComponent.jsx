import React, {useState, useRef, useEffect } from 'react';
import { Chart } from 'chart.js';
import axios from 'axios';

const ChartComponent = (props) => {
    const chartRef = useRef(null); // Sử dụng useRef để tạo tham chiếu đến canvas element
    const chartInstanceRef = useRef(null);
    const baseURL = "http://localhost:5000/expense";
    const token = sessionStorage.getItem("token");
    const [loading,setLoading] = useState(false);
    const [expense, setExpense] = useState(props.Expense);
   console.log("check expense",expense);
    
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    }
                })

                if (response.data) {
                    setLoading(true);
                    setExpense(response.data);
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }, [])
    useEffect(() => {

        const data = [
            { year: 2010, count: 20 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 },
        ];
        const filteredExpense = (expense || []).reduce((acc, item) => {
            if (acc[item.category]) {
                acc[item.category] += item.amount;
            } else {
                acc[item.category] = item.amount;
            }
            return acc;
        }, {});
        const formattedExpense = Object.keys(filteredExpense).map(category => ({
            Category: category,
            Amount: filteredExpense[category],
        }));
            console.log("chart array ",formattedExpense);
       
            if (formattedExpense.length === 0) return;


        chartInstanceRef.current= new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: formattedExpense.map(row => row.Category),
                datasets: [
                    {
                        label: 'Expenses by Year',
                        data: formattedExpense.map(row => row.Amount),
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
    }, [loading==true]);

    return <canvas ref={chartRef} id="acquisitions"></canvas>;
};

export default ChartComponent;
