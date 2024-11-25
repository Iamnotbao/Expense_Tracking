import React, { useState } from "react"
import axios from "axios"
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
          <li><i className="bi bi-bar-chart-line-fill"></i> DASH BOARD</li>
          <li><i className="bi bi-wallet2"></i> TRANSACTIONS</li>
          <li><i className="bi bi-bell-fill"></i> NOTIFICATION</li>
          <li><i className="bi bi-gear-fill"></i> SETTING</li>
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