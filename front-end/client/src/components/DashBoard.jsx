import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import "./CSS/DashBoard.css";
import ChartComponent from "./ChartComponent";
import axios from "axios";
import Chart_Income from "./Chart_Income";
const DashBoard = (props) => {
    const inforURL = "http://localhost:5000/getInfor";
    const token = sessionStorage.getItem("token");
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [selectExpense, setSelectedExpense] = useState(null);
    const [editExpensePopup, setEditExpensePopup] = useState(false);
    const [deleteExpensePopup, setDeleteExpensePopup] = useState(false);

    const [editIncomePopup, setEditIncomePopup] = useState(false);
    const [deleteIncomePopup, setDeleteIncomePopup] = useState(false);
    // const balance = sessionStorage.getItem("balance")






    //this is for income

    //edit
    const handleCancleIncome = () => {
        setEditIncomePopup(false);
        setDeleteIncomePopup(false)
    }
    const handleEditIncomePopUp = (income) => {
        setSelectedIncome(income);
        setEditIncomePopup(true);
        console.log("selected ", selectedIncome);
    };
    const handleDeleteIncomePopUp = (income) => {
        console.log(selectedIncome);
        setSelectedIncome(income);
        setDeleteIncomePopup(true);
    };

    const handleEditIncome = async (event) => {
        //event.preventDefault();
        const baseURL = "http://localhost:5000/income";
        let newEdit = {
            nameIncome: event.target.nameIncome.value,
            amount: event.target.amount.value,
            idIncome: selectedIncome.income._id
        }
        console.log("edit one ", newEdit);
        try {
            const response = await axios.put(`${baseURL}`, newEdit, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            if (response.data) {
                handleCancleIncome();
            }

        } catch (error) {
            console.log(error);
        }
    }
    //delete
    const handleDeleteIncome = async (event) => {
        // event.preventDefault();
        const baseURL = "http://localhost:5000/income";
        const currentUser = sessionStorage.getItem("userID");
        let deleteIncome = {
            userID: currentUser,
        };
        try {
            const response = await axios.delete(
                `${baseURL}/${selectedIncome.income._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                    data: deleteIncome,
                }
            );

            if (response.data) {
                handleCancleIncome();
            }
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    };
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
                console.log("get infor", response.data);
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

    useEffect(() => {
        console.log('Updated Income:', income);
        console.log('Updated Expense:', expense);

    }, [income, expense]);

    return (
        <div className="dashBoardScreen container-fluid">
            <div className="row">
                <div className="col-md-6 left-col">
                    <div className="numberAndChart">
                        <div className="numberBlock">
                            <div className="infoBlock" style={{ backgroundColor: "#E6FAFE" }}>
                                <p>Current Balance</p>
                                <h1>{props.BalanceNumber}$</h1>
                            </div>
                            <div className="infoBlock" style={{ backgroundColor: "#F7EFFF" }}>
                                <p>Total Income</p>
                                <h1>{props.IncomeNumber}$</h1>
                            </div>
                            <div className="infoBlock" style={{ backgroundColor: "#E6FAFE" }}>
                                <p>Total Expenses</p>
                                <h1>{props.ExpenseNumber}$</h1>
                            </div>
                        </div>
                        <div className="chart row">
                            <div style={{ width: '100%', height: '100%' }}>
                                <ChartComponent Income={income.income} Expense={expense.expense} />

                            </div>
                            <div style={{ width: '100%', height: '100%' }}>
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
                                        <th scope="col">Amount</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Payment Date</th>
                                        <th> action</th>
                                    </tr>
                                </thead>
                                {
                                    expense&& expense.map((item, index) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                                <td>{item.expense?.category}</td>
                                                <td>{item.expense?.amount}</td>
                                                <td>{item.expense?.location}</td>
                                                <td>{item.expense?.paymentMethod}</td>
                                                <td>{item.expense?.paymentDate}</td>
                                                <td className="buttonGroup">
                                                    <a className="edit" onClick={() => { handleEditIncomePopUp(item) }}>
                                                        <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                                    </a>
                                                    <a className="delete" onClick={() => { handleDeleteIncomePopUp(item) }}>
                                                        <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                }

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
                                                    <a className="edit" onClick={() => { handleEditIncomePopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                    <a className="delete" onClick={() => { handleDeleteIncomePopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
            {editIncomePopup && (

                <div id="editModal" className="modal_active" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={(event) => { handleEditIncome(event) }}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Income</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="nameIncome">Income Name</label>
                                        <input type="text" className="form-control" name="nameIncome" defaultValue={selectedIncome.income.nameIncome} required id="nameIncome" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input type="number" name="amount" className="form-control" defaultValue={selectedIncome.income.amount} required id="amount" />
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={handleCancleIncome} />
                                    <input type="submit" className="btn btn-info" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {deleteIncomePopup && (
                <div id="deleteModal" className="modal_active" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleDeleteIncome}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete Income</h4>
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete <span><b>{selectedIncome.income.nameIncome}</b></span> ?</p>
                                    <p className="text-warning"><small>This action cannot be undone.</small></p>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={handleCancleIncome} />
                                    <input type="submit" className="btn btn-danger" value="Delete" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
             {editExpensePopup && (
                <div id="editEmployeeModal" className="modal_active" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleEdit}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>category</label>
                                        <input type="text" name="category" defaultValue={select.category} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label> amount</label>
                                        <input type="number" name="amount" defaultValue={select.amount} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>description</label>
                                        <textarea className="form-control" defaultValue={select.description} name="description" required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>payment Method</label>
                                        <input type="text" className="form-control" defaultValue={select.paymentMethod} name="paymentMethod" required />
                                    </div>
                                    <div className="form-group">
                                        <label>location</label>
                                        <input type="text" className="form-control" defaultValue={select.location} name="location" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={handleCancle} />
                                    <input type="submit" className="btn btn-info" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {deleteExpensePopup && (
                <div id="deleteEmployeeModal" className="modal_active" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleDelete}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete these Records?</p>
                                    <p className="text-warning"><small>This action cannot be undone.</small></p>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={handleCancle} />
                                    <input type="submit" className="btn btn-danger" value="Delete" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
};
export default DashBoard;