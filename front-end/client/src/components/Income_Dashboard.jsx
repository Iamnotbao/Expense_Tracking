import { useEffect, useState } from "react";
import axios from "axios"
import "../components/CSS/Income.css"

const Income_DashBoard = () => {
    const [income, setIncome] = useState([]);
    const baseURL = "http://localhost:5000/income"
    const token = sessionStorage.getItem("token");
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deleteP, setDeleteP] = useState(false);
    console.log(income);
    
   


    console.log(token);

    const handleAddPopUp = () => {

        setAdd(true);
    };
    const handleEditPopUp = () => {

        setEdit(true);
    };
    const handleDeletePopUp = () => {

        setDeleteP(true);
    };

    const handleCancle = () => {
        setAdd(false);
        setEdit(false);
        setDeleteP(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    }
                })
                console.log("income", response.data);
                if(response.data){
                    setIncome(response.data.income);
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }, [])
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
                                    <button className="btn btn-success" data-toggle="modal" onClick={(event) => { handleAddPopUp(event) }}><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></button>
                                    <button className="btn btn-danger" data-toggle="modal"  onClick={(event) => { handleDeletePopUp(event) }}><i className="material-icons">&#xE15C;</i> <span>Delete</span></button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll" />
                                            <label htmlFor="selectAll"></label>
                                        </span>
                                    </th>
                                    <th>STT</th>
                                    <th>Income Name</th>
                                    <th>Amount</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {income.length !==0 &&
                                    income.map((item,index)=>(
                                        <tr key={index}>
                                        <td>
                                            <span className="custom-checkbox">
                                                <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                                <label htmlFor="checkbox1"></label>
                                            </span>
                                        </td>
                                        <td>{index+1}</td>
                                        <td>{item.nameIncome}</td>
                                        <td>{item.amount}$</td>
                                        <td>{item.user.username}</td>
                                        <td>
                                            <a href="#editEmployeeModal" className="edit" onClick={(event) => { handleEditPopUp(event) }}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                            <a href="#deleteEmployeeModal" className="delete"  onClick={handleDeletePopUp}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                        </td>
                                    </tr>
                                    )
                                )}
                               

                            </tbody>
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
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={handleCancle}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea className="form-control" required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" className="form-control" required />
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
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea className="form-control" required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" className="form-control" required />
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
                            <form>
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
        </>

    )
}
export default Income_DashBoard;