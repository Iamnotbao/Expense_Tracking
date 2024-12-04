import axios from "axios";
import { useEffect, useState } from "react";
import "./CSS/Profile.css"

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const inforURL = "http://localhost:5000/getInfor";
    const edit = "http://localhost:5000/editUser";
    const currentID = sessionStorage.getItem("userID");
    const token = sessionStorage.getItem("token");
    const [profilePop, setProfilePop] = useState(false);
    console.log("user:", profile);
    console.log(profilePop);

    const handlePopup = () => {
        setProfilePop(true);
    }
    const handleCancle = () => {
        setProfilePop(false);
    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        const newEdit = { userID: profile._id, username: event.target.username.value, email: event.target.email.value, phone: event.target.phone.value, address: event.target.address.value, role_id: profile.role_id }

        try {
            const response = await axios.put(`${edit}`, newEdit, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            if (response.data) {
                setProfile(response.data);
                handleCancle();
            }

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${inforURL}/${currentID}`, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    }
                });

                if (response.status === 200) {
                    console.log("get infor", response.data);
                    setProfile(response.data)
                } else {
                    console.error("No income data found or error response:", response);
                }
            } catch (error) {
                console.error("Error fetching income data:", error);
            }
        }
        fetchData();
    }, [])
    return (<>

        <div className="page-content page-container" id="page-content">
            <div className="padding">
                {profile ? (

                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25">
                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
                                            </div>
                                            <h6 className="f-w-600">{(profile.role_id == 1) ? ("admin") : ("")}</h6>
                                            <p className="m-b-10 f-w-600">Username</p>
                                            <p>{profile.username}</p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <h6 className="text-muted f-w-400">{profile.email}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                    <h6 className="text-muted f-w-400">{profile.phone}</h6>
                                                </div>
                                            </div>
                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Total Income</p>
                                                    <h6 className="text-muted f-w-400">{profile.income}$</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Total Expense</p>
                                                    <h6 className="text-muted f-w-400">{profile.expense}$</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Balance</p>
                                                    {profile.balance !== 0 ? (<h6 className="text-muted f-w-400">{profile.balance}$</h6>) : (<h6 style={{ color: "red", fontWeight: "bold" }} className="text-muted ">Your Budget is overused {profile.balance}$</h6>)}
                                                </div>
                                            </div>
                                            <button onClick={handlePopup} type="button" class="btn btn-primary social-link list-unstyled m-t-40 m-b-10" data-toggle="button" aria-pressed="false" autocomplete="off">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<p>Loading...</p>)}

            </div>
            {profilePop && (<div id="editModal" className="modal_active" role="dialog" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleUpdate}>
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Income</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="nameIncome">Username</label>
                                    <input type="text" className="form-control" name="username" defaultValue={profile.username} required id="nameIncome" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" className="form-control" defaultValue={profile.email} required id="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number" name="phone" className="form-control" defaultValue={profile.phone} required id="phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" name="address" className="form-control" defaultValue={profile.address} required id="address" />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={handleCancle} />
                                <input type="submit" className="btn btn-info" value="Update"  />
                            </div>
                        </form>
                    </div>
                </div>
            </div>)}

        </div>
    </>)
}
export default Profile;