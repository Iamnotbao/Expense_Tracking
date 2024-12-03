import { useState, useEffect } from "react";
import axios from "axios";
const User_DashBoard = () => {
    const baseURL = "http://localhost:5000/users";
    const [listOfUser, setListOfUser] = useState([]);
    const [editUserPopup, setEditUserPopup] = useState(false);
    const [deleteUserPopUp, setDeleteUserPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = sessionStorage.getItem("token");

    const handleCancle = () => {
        setDeleteUserPopup(false);
        setEditUserPopup(false);
    }
    const handleEditUserPopup = (item) => {
        setSelectedUser(item);
        console.log(selectedUser);

        setEditUserPopup(true);
        setDeleteUserPopup(false);
    }
    const handleDeleteUserPopup = (item) => {
        setSelectedUser(item);
        console.log(selectedUser);

        setDeleteUserPopup(true);
        setEditUserPopup(false);
    }

    //fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                });
                // console.log(response.data);
                if (response.data) {
                    setListOfUser(response.data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        // console.log(listOfUser);
    }, [])

    //edit User

    const handleEditUser = async (event) => {
        // event.preventDefault();
        try {
            const baseURL = "http://localhost:5000/editUser";
            //  const { userID, username, email, phone, address, role_id } = req.body;
            const username = event.target.username.value;
            const email = event.target.email.value;
            const phone = event.target.phone.value;
            const address = event.target.address.value;
            const role_id = event.target.role_id.value;
            console.log("Form Data:", { username, email, phone, address, role_id });

            const postData = {
                userID: selectedUser._id,
                username: username,
                email: email,
                phone: phone,
                address: address,
                role_id: role_id,
            }
            const response = await axios.put(`${baseURL}`, postData,)
            if (response.data) {
                console.log("user editted successfully:", response.data);
                handleCancle(); // Gọi hàm hủy hoặc reset form
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteUser = async (event) => {
       // event.preventDefault();

        const baseURL = "http://localhost:5000/deleteUser";
        const deleteData = {
            userID: selectedUser._id,
        };

        console.log("token ", token);
        console.log(deleteData);

        try {
            const response = await axios.delete(`${baseURL}`, {
                data: deleteData,
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });

            if (response.data) {
                console.log("User deleted successfully:", response.data);
                handleCancle(); 
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };



    return (
        <>
            <div className="container">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8"><h2>Customer <b>Details</b></h2></div>
                                <div className="col-sm-4">
                                    <div className="search-box">
                                        <i className="material-icons">&#xE8B6;</i>
                                        <input type="text" className="form-control" placeholder="Search&hellip;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name <i className="fa fa-sort"></i></th>
                                    <th>Email<i className="fa fa-sort"></i></th>
                                    <th>Phone<i className="fa fa-sort"></i></th>
                                    <th>Address<i className="fa fa-sort"></i></th>
                                    <th>Role<i className="fa fa-sort"></i></th>
                                    <th>Balance<i className="fa fa-sort"></i></th>
                                    <th>income<i className="fa fa-sort"></i></th>
                                    <th>Expense<i className="fa fa-sort"></i></th>
                                    <th>Action</th>

                                </tr>
                            </thead>

                            {listOfUser ? (
                                listOfUser.map((item, index) => (
                                    <tbody key={index}>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>{item.role_id == 0 ? "user" : "admin"}</td>
                                            <td>{item.balance}</td>
                                            <td>{item.income}</td>
                                            <td>{item.expense}</td>
                                            <td>
                                                <a href="#" className="view" title="View" data-toggle="tooltip" ><i className="material-icons">&#xE417;</i></a>
                                                <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={() => { handleEditUserPopup(item) }}><i className="material-icons">&#xE254;</i></a>
                                                <a href="#" className="delete" title="Delete" data-toggle="tooltip" onClick={() => { handleDeleteUserPopup(item) }}><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            ) : (<p>Loading</p>)}

                        </table>
                        <div className="clearfix">
                            <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul className="pagination">
                                <li className="page-item disabled"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                                <li className="page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                <li className="page-item"><a href="#" className="page-link"><i className="fa fa-angle-double-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    {editUserPopup && (

                        <div id="editModal" className="modal_active" role="dialog" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form onSubmit={handleEditUser}>
                                        <div className="modal-header">
                                            <h4 className="modal-title">Edit User</h4>
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="nameIncome">Username</label>
                                                <input type="text" className="form-control" name="username" defaultValue={selectedUser.username} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nameIncome">Email</label>
                                                <input type="email" className="form-control" name="email" defaultValue={selectedUser.email} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="amount">Phone</label>
                                                <input type="phone" name="phone" className="form-control" defaultValue={selectedUser.phone} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="amount">Address</label>
                                                <textarea name="address" className="form-control" defaultValue={selectedUser.address} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="amount">Role</label>
                                                <select className="form-control" name="role_id" defaultValue={selectedUser.role_id}>
                                                    <option value="0">Admin</option>
                                                    <option value="1">User</option>
                                                </select>
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
                    {deleteUserPopUp && (
                        <div id="deleteModal" className="modal_active" tabIndex="-1" role="dialog" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form onSubmit={handleDeleteUser}>
                                        <div className="modal-header">
                                            <h4 className="modal-title">Delete Income</h4>
                                            <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete <span><b>{selectedUser.username}</b></span> ?</p>
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
            </div>
        </>
    )
}
export default User_DashBoard;