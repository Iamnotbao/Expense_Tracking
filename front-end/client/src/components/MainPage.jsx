import React, { useState } from "react"
// import axios from "axios"
import "./CSS/MainPage.css";
import DashBoard from "./DashBoard";
const MainPage = () => {

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <img src="./image/finance.png" alt="logo"/>
        </div>
        <ul>
          <li><a href=""><i className="bi bi-bar-chart-line-fill"></i> DASH BOARD</a></li>
          <li><a href="/expense_tracking/home/income"><i class="fa-solid fa-money-check-dollar"></i> INCOME</a></li>
          <li><a href=""><i class="fa-solid fa-money-bills"></i> EXPENSE</a></li>
          <li><a href=""><i className="bi bi-wallet2"></i> TRANSACTIONS</a></li>
          <li><a href=""><i className="bi bi-bell-fill"></i> NOTIFICATION</a></li>
          <li><a href=""><i className="bi bi-gear-fill"></i> SETTING</a></li>
          
          
        </ul>
      </div>
      <div className="main-content">
        <h1 style={{ fontSize: "30px", fontWeight: "bold", width: "400px", wordWrap: "break-word" }}>Project Expense Tracking Software</h1>
        <DashBoard />
      </div>
    </div>
  );
}
export default MainPage;