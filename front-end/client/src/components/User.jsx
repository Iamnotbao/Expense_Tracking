import User_DashBoard from "./User_DashBoard";
import Sidebar from"./Sidebar";
const User =()=>{
    return( <>
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <User_DashBoard />
            </div>
        </div></>)
}
export default User;