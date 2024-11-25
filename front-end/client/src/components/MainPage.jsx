import React, { useEffect, useState } from "react"
import axios from "axios";
import "./CSS/MainPage.css";
import DashBoard from "./DashBoard";
import Transaction from "./Transaction";
import Notification from "./Notification";
import Setting from "./Setting";
const MainPage = () => {

  //side bar paget
  const [page, setPage] = useState(1);
  function sideBarNavigate() {
    if (page === 1) {
      return <DashBoard />
    } else if (page === 2) {
      return <Transaction />
    } else if (page === 3) {
      return <Notification />
    } else if (page === 4) {
      return <Setting />
    }
  }

  //side bar navigation
  function sideBarPage(i) {
    setPage(i);
    sideBarNavigate();
  }
  const [User,setUser]= useState(null);

  // get user session
  const getLocalUser = () => {
    const user=localStorage.getItem("localUser");
    if (user) {
      const parsedUser = JSON.parse(user);  
      setUser(parsedUser);
      console.log(parsedUser);
    } else {
      console.log("No user found in localStorage");
    }
  };
  

  useEffect(() => {
  getLocalUser();
  }, []);
  return (
    <div className="app">
      <div className="sidebar">
        <h2><img src="../image/finance.png" alt="logo" style={{ width: "100px" }} /></h2>
        <ul>
          <li className={page === 1 ? "selected" : ""} onClick={() => sideBarPage(1)}><i className="bi bi-bar-chart-line-fill"></i> DASH BOARD</li>
          <li className={page === 2 ? "selected" : ""} onClick={() => sideBarPage(2)}><i className="bi bi-wallet2"></i> TRANSACTIONS</li>
          <li className={page === 3 ? "selected" : ""} onClick={() => sideBarPage(3)}><i className="bi bi-bell-fill"></i> NOTIFICATION</li>
          <li className={page === 4 ? "selected" : ""} onClick={() => sideBarPage(4)}><i className="bi bi-gear-fill"></i> SETTING</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="headNav">
          {/* <div>{JSON.stringify(User, null, 2)}</div> */}
          <h1 style={{ fontSize: "30px", fontWeight: "bold", width: "400px", wordWrap: "break-word" }}>Project Expense Tracking Software</h1>
          <div className="userNameAvatar">
            <i className="bi bi-bell notification" style={{ margin: "10px" }}><div className="circleNumber">11</div></i>
            <p style={{ fontWeight: "bold", float: "left", padding: "10px" }}>        {User ? User.username : 'Loading...'}
            </p>
            <img src="../image/avatar/wolf.jpg" alt="Avatar" className="avatar"></img>
          </div>
        </div>
        {sideBarNavigate()}
      </div>
    </div>
  );
}
export default MainPage;