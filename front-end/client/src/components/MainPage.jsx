import React, { useEffect, useState } from "react"
import "./CSS/MainPage.css";
import DashBoard from "./DashBoard";
import Sidebar from "./Sidebar";
import axios from "axios";
const MainPage = () => {
  const token = localStorage.getItem("token");
  console.log("check token: ", token);
  
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get("",{
          headers:{
            Authorization:`Bearer ${JSON.parse(token)}`
          }
        })
        console.log("Noti displays here: ",response.data);
       
        
      } catch (error) {
          console.log(error);
          
      }
    }
    fetchData();
  },[])

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