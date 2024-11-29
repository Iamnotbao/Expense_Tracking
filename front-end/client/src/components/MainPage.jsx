import React, { useState } from "react"
import "./CSS/MainPage.css";
import DashBoard from "./DashBoard";
import Sidebar from "./Sidebar";
const MainPage = () => {

  return (
    <div className="app">
      <Sidebar/>
      <div className="main-content">
        <h1 style={{ fontSize: "30px", fontWeight: "bold", width: "400px", wordWrap: "break-word" }}>Project Expense Tracking Software</h1>
        <DashBoard />
      </div>
    </div>
  );
}
export default MainPage;