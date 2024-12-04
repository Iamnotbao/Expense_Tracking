import Profile from "./Profile";
import Sidebar from "./Sidebar";

const Profile_DashBoard =()=>{
    return (<>
        <div className="app">
          <Sidebar/>
            <div className="main-content">
               <Profile/>
            </div>
        </div></>)

}
export default Profile_DashBoard;
