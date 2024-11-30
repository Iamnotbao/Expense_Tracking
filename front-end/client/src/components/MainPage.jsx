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

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log("run fetch");
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
          setIncome(response.data.totalimo[1]);
          setExpense(response.data.totalimo[2]);
          setBalance(response.data.totalimo[0]);
        } else {
          toast.error(response.data.message);
          setIncome(response.data.totalimo[1]);
          setExpense(response.data.totalimo[2]);
          setBalance(0);
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
        <h1 style={{ fontSize: "30px", fontWeight: "bold", width: "400px", wordWrap: "break-word" }}>Project Expense Tracking Software</h1>
        <DashBoard IncomeNumber={income} BalanceNumber={balance} ExpenseNumber={expense} />
      </div>
    </div>
  );
}
export default MainPage;