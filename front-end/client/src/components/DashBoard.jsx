import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import "./CSS/DashBoard.css";
import ChartComponent from "./ChartComponent";
import axios from "axios";
import Chart_Income from "./Chart_Income";
const DashBoard = () => {
    const inforURL = "http://localhost:5000/getIncome";
    const token = sessionStorage.getItem("token");
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const balance = sessionStorage.getItem("balance")


    const fetchIncomeData = async () => {
        const currentID = sessionStorage.getItem("userID");
        if (!currentID || !token) {
            console.error("User ID or token is missing in sessionStorage.");
            return;
        } else {
            console.log("current Id: ", currentID);
        }

        try {
            const response = await axios.get(`${inforURL}/${currentID}`, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`
                }
            });

            if (response.status === 200) {
                setIncome(response.data.listIncome);
                setExpense(response.data.listExpense);

            } else {
                console.error("No income data found or error response:", response);
            }
        } catch (error) {
            console.error("Error fetching income data:", error);
        }
    }
    useEffect(() => {
        fetchIncomeData();

    }, []);

    // useEffect(() => {
    //     // console.log('Updated Income:', income);
    //     // console.log('Updated Expense:', expense);
    // }, [income, expense]);

    return (
        <div className="dashBoardScreen container-fluid">
            <div className="row">
                <div className="col-md-6 left-col">
                    <div className="numberAndChart">
                        <div className="numberBlock">
                            <div className="infoBlock" style={{ backgroundColor: "#E6FAFE" }}>
                                <p>Current Balance</p>
                                <h1>{balance}$</h1>
                            </div>
                            <div className="infoBlock" style={{ backgroundColor: "#F7EFFF" }}>
                                <p>Total Income</p>
                                <h1>3000 vnđ</h1>
                            </div>
                            <div className="infoBlock" style={{ backgroundColor: "#E6FAFE" }}>
                                <p>Total Expenses</p>
                                <h1>3000 vnđ</h1>
                            </div>
                        </div>
                        <div className="chart row">
                        <div style={{ width: '100%', height: '100%' }}>
                        <ChartComponent Income={income.income} Expense={expense.expense} />

                            </div>
                            <div  style={{ width: '100%', height: '100%' }}>
                                <Chart_Income Income={income} Expense={expense.expense} />
                            </div>

                        </div>

                    </div>
                </div>
                <div className="col-md-6 right-col">
                    <h1>Manage Balance</h1>
                    <div className="infoTable">

                        <div className="expenseTable">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Index</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Payment Date</th>
                                        <th> action</th>
                                    </tr>
                                </thead>
                                {
                                    expense.length !== 0 &&
                                    expense.map((item, index) => (

                                        <tbody key={index}>
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                                <td>{item.expense.category}</td>
                                                <td style={{ overflowX: 'auto' }}>{item.expense.description}</td>
                                                <td>{item.expense.location}</td>
                                                <td>{item.expense.paymentMethod}</td>
                                                <td>{item.expense.paymentDate}</td>
                                                <td className="buttonGroup">
                                                    <a className="edit" onClick={() => { handleEditPopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                    <a className="delete" onClick={() => { handleDeletePopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                                </td>
                                            </tr>

                                        </tbody>

                                    )
                                    )}
                            </table>
                        </div>
                        <div className="incomeTable">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">index</th>
                                        <th scope="col">Income Name</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    income.length !== 0 &&
                                    income.map((item, index) => (

                                        <tbody key={index}>
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                                <td>{item.income.nameIncome}</td>
                                                <td>{item.income.amount}</td>
                                                <td className="buttonGroup">
                                                    <a className="edit" onClick={() => { handleEditPopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                    <a className="delete" onClick={() => { handleDeletePopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                                </td>
                                            </tr>

                                        </tbody>

                                    )
                                    )}
                            </table>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
};
export default DashBoard;