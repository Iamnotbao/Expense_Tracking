import React, { useEffect, useState } from "react"
import "./CSS/MainPage.css";
import DashBoard from "./DashBoard";
import Sidebar from "./Sidebar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
const MainPage = () => {
  const token = sessionStorage.getItem("token");
  console.log("check token: ", token);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentID = sessionStorage.getItem("userID");
        const bodyData = {
          userID: currentID,
        }
        const response = await axios.post("http://localhost:5000/notification", bodyData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })
        console.log("Noti displays here: ", response.data);
        if (response.data.success) {
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message);

        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="app">
      <ToastContainer />
      <Sidebar />
      <div className="main-content">
        <div className="alert alert-success" role="alert">
          A simple success alert—check it out!
        </div>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", width: "400px", wordWrap: "break-word" }}>Project Expense Tracking Software</h1>
        <DashBoard />
      </div>
    </div>
  );
}
export default MainPage;