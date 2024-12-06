import { useEffect, useState } from "react";
import axios from "axios"
import "../components/CSS/Income.css"

const Expense_DashBoard = () => {
    const [expense, setExpense] = useState([]);
    const baseURL = "http://localhost:5000/expense";
    const token = sessionStorage.getItem("token");
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deleteP, setDeleteP] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState([]);
    const [select, setSelect] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const role = sessionStorage.getItem("role");
    const list = sessionStorage.getItem("listExpense");
    const username = sessionStorage.getItem("username");
    const userID = sessionStorage.getItem("userID");
    // const ListofUser = JSON.parse(list);
    console.log(role);
    console.log("expense ", expense);
    //console.log("check selected"+ selectedExpense);

    useEffect(() => {
        const fetchExpense = async () => {
            if (role == 1) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(baseURL, {
                            headers: {
                                "Authorization": `Bearer ${JSON.parse(token)}`
                            }
                        })
                        console.log("expense", response.data);

                        if (response.data) {
                            setExpense(response.data);
                        }
                    } catch (error) {
                        console.log(error);

                    }
                }
                fetchData();
            } else {
                const fetchExpenseData = async () => {
                    const inforURL = "http://localhost:5000/getInfor";
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
                            // console.log("get infor", response.data);
                            setExpense(response.data.listExpense);
                            sessionStorage.setItem("listExpense", response.data.listExpense);
                        } else {
                            console.error("No income data found or error response:", response);
                        }
                    } catch (error) {
                        console.error("Error fetching income data:", error);
                    }
                }
                fetchExpenseData();
            }
        }
        fetchExpense();
        }, [])
    const handleAddPopUp = () => {
        setAdd(true);
    };
    const handleEditPopUp = (item) => {
        setSelect(item);
        setEdit(true);
    };
    const handleDeletePopUp = (item) => {
        setSelect(item);
        setDeleteP(true);
    };

    const handleCancle = () => {
        setAdd(false);
        setEdit(false);
        setDeleteP(false);
    }

    const handleCheckBox = (item) => {
        setSelectedExpense((prevSelected) => {
            const isItemSelected = prevSelected.some((selectedItem) => selectedItem._id === item._id);
            return isItemSelected
                ? prevSelected.filter((selectedItem) => selectedItem._id !== item._id)
                : [...prevSelected, item];
        });
    }
    const handleDeleteMultiple = async () => {
        // event.preventDefault();
        console.log("run multi expense ", selectedExpense);
        let deleteMulti;
        if (role == 1) {
            deleteMulti = {
                userID: selectedExpense.user_id,
            };
        }
        else {
            deleteMulti = {
                userID: selectedExpense[0].user,
            };
        }
        console.log("this", deleteMulti);
        try {
            const response = await axios.delete(
                `${baseURL}/multi`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                    data: {
                        listExpense: selectedExpense,
                        userID: deleteMulti.userID
                    }
                }
            );
            if (response.data) {
                console.log("result", response.data);
                setExpense(response.data.listExpense)
                handleCancle();
            }
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    };

    const handleAdd = async (event) => {
        //app.post("/expense/create",addExpense);
        //event.preventDefault();
        try {
            let newExpense = {
                username: (role == 1) ? event.target.username.value : username,
                category: event.target.category.value,
                amount: event.target.amount.value,
                description: event.target.description.value,
                paymentMethod: event.target.paymentMethod.value,
                location: event.target.location.value,
                month: event.target.month.value,
                year: event.target.year.value,
            };
            console.log(newExpense);
            // console.log(`${baseURL}/create/${newIncome.userName}`);
            const response = await axios.post(`${baseURL}/create`, newExpense, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            if (response.data) {
                console.log("Expense added successfully:", response.data);
                handleCancle();

            }

        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = async (event) => {
        // const {expenseId,category, amount,description,paymentMethod,location}=req.body
        // event.preventDefault();
        console.log(select);
        try {
            let newExpense = {
                expenseId: select._id,
                category: event.target.category.value,
                amount: event.target.amount.value,
                description: event.target.description.value,
                paymentMethod: event.target.paymentMethod.value,
                location: event.target.location.value,
                month: event.target.month.value,
                year: event.target.year.value,
            }
            console.log("seleted for edit ", newExpense);
            const response = await axios.put((`${baseURL}`), newExpense, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            if (response.data) {
                console.log(response);
                handleCancle();
            }
        } catch (error) {
            console.log(error);
        };
    }
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedExpense([]);
        } else {
            setSelectedExpense(expense.map(item => item._id));
        }
        setSelectAll(!selectAll);
    };

    const handleDelete = async (event) => {
        //event.preventDefault();
        console.log("Run delete");
        console.log(select);
        console.log(`${baseURL}/${select._id}`);
        let deleteExpense = {
            userID: (role == 1) ? select.user._id : userID,
        };
        try {
            const response = await axios.delete(
                `${baseURL}/${select._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                    data: deleteExpense,
                }
            );
            if (response.data) {
                console.log("delete response :", response.data);
                handleCancle();
            }
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h2>Manage <b>Expense</b></h2>
                                </div>
                                <div className="col-xs-6">
                                    <button className="btn btn-success" data-toggle="modal" onClick={handleAddPopUp}><i className="material-icons">&#xE147;</i> <span>Add New Expense</span></button>
                                    {/* <button className="btn btn-danger" data-toggle="modal" onClick={handleDeleteMultiple}><i className="material-icons">&#xE15C;</i> <span>Delete</span></button> */}
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll" onChange={() => { handleSelectAll() }} />
                                            <label htmlFor="selectAll"></label>
                                        </span>
                                    </th>
                                    <th>STT</th>
                                    <th>Expense name</th>
                                    <th>Amount</th>
                                    <th>User Name</th>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {(role == 1) ? (
                                <tbody>
                                    {expense.length !== 0 &&
                                        expense.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className="custom-checkbox">
                                                        <input type="checkbox" id="checkbox1" className="options[]"
                                                            value="1"
                                                            checked={selectAll || selectedExpense.includes(item)}
                                                            onChange={() => { handleCheckBox(item) }} />
                                                        <label htmlFor="checkbox1"></label>
                                                    </span>
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.category}</td>
                                                <td>{item.amount}$</td>
                                                <td>{item.user.username}</td>
                                                <td>{item.month}</td>
                                                <td>{item.year}</td>
                                                <td>
                                                    <a href="#editEmployeeModal" className="edit" onClick={() => { handleEditPopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                    <a href="#deleteEmployeeModal" className="delete" onClick={() => { handleDeletePopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                                </td>
                                            </tr>
                                        )
                                        )}
                                </tbody>
                            ) : (
                                <tbody>
                                    {expense && expense.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="custom-checkbox">
                                                    <input type="checkbox" id="checkbox1" className="options[]" value="1"
                                                        checked={selectAll || selectedExpense.includes(item.expense)}
                                                        onChange={() => { handleCheckBox(item.expense) }} />
                                                    <label htmlFor="checkbox1"></label>
                                                </span>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.expense.category}</td>
                                            <td>{item.expense.amount}$</td>

                                            <td>{username}</td>
                                            <td>{item.expense.month}</td>
                                            <td>{item.expense.year}</td>

                                            <td>
                                                <a className="edit" onClick={() => { handleEditPopUp(item.expense) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                <a className="delete" onClick={() => { handleDeletePopUp(item.expense) }}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            )}

                        </table>
                        <div className="clearfix">
                            <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul className="pagination">
                                <li className="page-item disabled"><a href="#">Previous</a></li>
                                <li className="page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                <li className="page-item"><a href="#" className="page-link">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {add && (

                <div id="addEmployeeModal" className="modal_active" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleAdd}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Expense</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={handleCancle}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    {role == 1 &&
                                        <div className="form-group">
                                            <label>username</label>
                                            <input type="text" name="username" className="form-control" required />
                                        </div>
                                    }

                                    <div className="form-group">
                                        <label>category</label>
                                        <input type="text" name="category" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>amount</label>
                                        <input type="number" name="amount" className="form-control" required></input>
                                    </div>
                                    <div className="form-group">
                                        <label>description</label>
                                        <textarea name="description" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Payment Method</label>
                                        <input type="text" name="paymentMethod" className="form-control" required></input>
                                    </div>
                                    <div className="form-group">
                                        <label>location</label>
                                        <input type="text" name="location" className="form-control" required></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Month</label>
                                        <input type="number" name="month" className="form-control" required></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input type="number" name="year" className="form-control" required></input>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={handleCancle} />
                                    <input type="submit" className="btn btn-success" value="Add" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {edit && (
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
                                    <div className="form-group">
                                        <label>Month</label>
                                        <input type="text" className="form-control" defaultValue={select.month} name="month" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input type="text" className="form-control" defaultValue={select.year} name="year" required />
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
            {deleteP && (
                <div id="deleteEmployeeModal" className="modal_active" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleDelete}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete {select.category}</p>
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
        </>

    )
}

export default Expense_DashBoard;