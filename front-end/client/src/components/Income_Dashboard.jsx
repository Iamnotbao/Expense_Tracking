import { useEffect, useState } from "react";
import axios from "axios"
import "../components/CSS/Income.css"
const Income_DashBoard = () => {
    const [income, setIncome] = useState([]);
    const baseURL = "http://localhost:5000/income";
    const token = sessionStorage.getItem("token");
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deleteP, setDeleteP] = useState(false);
    const [select, setSelect] = useState(null);
    const [newAdd, setNewAdd] = useState(null);
    const [selectedIncome, setSelectedIncome] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const role = sessionStorage.getItem("role");
    const list = sessionStorage.getItem("listIncome");
    const username = sessionStorage.getItem("username");
    const ID = sessionStorage.getItem("userID");
    console.log("income", income);
    console.log(select);

    const ListofUser = JSON.parse(list);
    useEffect(() => {
        const fetchIncomeData = async () => {

            if (role == 1) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(baseURL, {
                            headers: {
                                "Authorization": `Bearer ${JSON.parse(token)}`
                            }
                        })
                        console.log("income", response.data);
                        if (response.data) {
                            setIncome(response.data.income);
                        }
                    } catch (error) {
                        console.log(error);

                    }
                }
                fetchData();
            }
            else {
                setIncome(ListofUser);
            }
        }
        fetchIncomeData();
        }, [])
    //  console.log("select",select);

    const handleDelete = async (event) => {
        event.preventDefault();
        let deleteIncome;
        if (role == 1) {
            deleteIncome = {
                userID: select.user._id,
            };
        }
        else {
            deleteIncome = {
                userID: select.user,
            };
        }
        console.log("this", deleteIncome);
        console.log(deleteIncome);
        try {
            const response = await axios.delete(
                `${baseURL}/${select._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                    data: deleteIncome,
                }
            );

            if (response.data) {
                console.log("result", response.data);

                setIncome(response.data)

                handleCancle();
            }
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    };
    console.log("mulple", selectedIncome);
    const handleDeleteMultiple = async () => {
        // event.preventDefault();
        console.log("kkk");

        let deleteMulti;
        if (role == 1) {
            deleteMulti = {
                userID: selectedIncome.user._id,
            };
        }
        else {
            deleteMulti = {
                userID: selectedIncome[0].income.user,
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
                        listIncome: selectedIncome,
                        userID: deleteMulti.userID
                    }
                }
            );

            if (response.data) {
                console.log("result", response.data);
                setIncome(response.data.listIncome);
                handleCancle();
            }
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    };





    const handleEdit = async (event) => {
        event.preventDefault();
        let newEdit = {
            nameIncome: event.target.nameIncome.value,
            amount: event.target.amount.value,
            idIncome: select._id
        }
        console.log("New Edit Data:", newEdit);

        try {
            const response = await axios.put(`${baseURL}`, newEdit, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            if (response.data) {
                console.log("ob", response.data._id);
                const updatedIncome = income.map((i) => {
                    if (i.income?._id === response.data._id) {
                        return {
                            ...i,
                            income: {
                                ...i.income,
                                ...response.data,
                            },
                        };
                    }

                    return i;
                });

                console.log("update ", updatedIncome);
                setIncome(updatedIncome);
                handleCancle();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddPopUp = () => {
        setAdd(true);
    };
    const handleEditPopUp = (income) => {
        setSelect(income);
        setEdit(true);
    };
    const handleDeletePopUp = (income) => {
        console.log(selectedIncome);
        setSelect(income)
        setDeleteP(true);
    };

    const handleCancle = () => {
        setAdd(false);
        setEdit(false);
        setDeleteP(false)
    }
    const handleCheckBox = (item) => {
        setSelectedIncome((prevSelected) => {
            const isItemSelected = prevSelected.some((selectedItem) => selectedItem._id === item._id);
            return isItemSelected
                ? prevSelected.filter((selectedItem) => selectedItem._id !== item._id)
                : [...prevSelected, item];
        });
    };
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIncome([]);
        } else {
            setSelectedIncome(income.map(item => item._id));
        }
        setSelectAll(!selectAll);
    }
    const handleAdd = async (event) => {
        event.preventDefault();
        try {
            let newIncome = {
                userID: ID,
                nameIncome: event.target.nameIncome.value,
                amount: event.target.amount.value,
                month: event.target.month.value,
                year: event.target.year.value,

            }
            console.log(newIncome);

            const response = await axios.post(`${baseURL}/create/`, newIncome, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            if (response.data) {
                console.log(response.data);
                setIncome(response.data.listIncome);
                handleCancle();
            } else {
                console.log("not found");
            }
        } catch (error) {
            console.log(error);
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
                                    <h2>Manage <b>Income</b></h2>
                                </div>
                                <div className="col-xs-6">
                                    <button className="btn btn-success" data-toggle="modal" onClick={(event) => { handleAddPopUp(event) }}><i className="material-icons">&#xE147;</i> <span>Add New Income</span></button>
                                    <button className="btn btn-danger" data-toggle="modal" onClick={handleDeleteMultiple}><i className="material-icons">&#xE15C;</i> <span>Delete</span></button>
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
                                    <th>Income Name</th>
                                    <th>Amount</th>
                                    <th>User Name</th>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {(role == 1) ? (
                                <tbody>
                                    {income.length !== 0 &&
                                        income.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className="custom-checkbox">
                                                        <input type="checkbox" id="checkbox1" className="options[]" value="1"
                                                            checked={selectAll || selectedIncome.includes(item._id)}
                                                            onChange={() => { handleCheckBox(item) }} />
                                                        <label htmlFor="checkbox1"></label>
                                                    </span>
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.nameIncome}</td>
                                                <td>{item.amount}$</td>

                                                {item.user && (item.user.username) ? (<td>{item.user.username}</td>) : (<td>Loading....</td>)}
                                                <td>{item.month}</td>
                                                <td>{item.Year}</td>
                                                <td>

                                                    <a className="edit" onClick={() => { handleEditPopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                    <a className="delete" onClick={() => { handleDeletePopUp(item) }}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                                </td>
                                            </tr>
                                        )
                                        )}


                                </tbody>
                            ) : (<tbody>
                                {income.length !== 0 &&
                                    income.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="custom-checkbox">
                                                    <input type="checkbox" id="checkbox1" className="options[]" value="1"
                                                        checked={selectAll || selectedIncome.some((selectedItem) => selectedItem._id === item._id)}
                                                        onChange={() => handleCheckBox(item)} />
                                                    <label htmlFor="checkbox1"></label>
                                                </span>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.income.nameIncome}</td>
                                            <td>{item.income.amount}$</td>

                                            <td>{username}</td>
                                            <td>{item.income.month}</td>
                                            <td>{item.income.Year}</td>

                                            <td>
                                                <a className="edit" onClick={() => { handleEditPopUp(item.income) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                                <a className="delete" onClick={() => { handleDeletePopUp(item.income) }}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    )
                                    )}
                            </tbody>)}

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
                <div id="addModal" className="modal_active" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleAdd}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Income</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={handleCancle}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Income Name</label>
                                        <input type="text" name="nameIncome" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" name="amount" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Month</label>
                                        <input type="number" name="month" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input type="number" name="year" className="form-control" required />
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

                <div id="editModal" className="modal_active" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleEdit}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Income</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="nameIncome">Income Name</label>
                                        <input type="text" className="form-control" name="nameIncome" defaultValue={select.nameIncome} required id="nameIncome" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input type="number" name="amount" className="form-control" defaultValue={select.amount} required id="amount" />
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
                <div id="deleteModal" className="modal_active" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleDelete}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete Income</h4>
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete <span><b>{(role == 1) ? (select.nameIncome) : (select.nameIncome)}</b></span> ?</p>
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
export default Income_DashBoard;