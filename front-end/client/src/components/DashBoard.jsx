import React from "react";
import Chart from 'chart.js/auto';
import "./CSS/DashBoard.css"
import ChartComponent from "./ChartComponent";
const DashBoard = () => {
    return (
        <div className="dashBoardScreen">
            <div className="numberAndChart">
                <div className="numberBlock">
                    <div className="infoBlock" style={{ backgroundColor: "#E6FAFE" }}>
                        <p>Current Balance</p>
                        <h1>3000 vnđ</h1>
                    </div>
                    <div className="infoBlock" style={{ backgroundColor: "#F7EFFF" }}>
                        <p>Total Income</p>
                        <h1>3000 vnđ</h1>
                    </div>
                    <div className="infoBlock" style={{ backgroundColor: "#E6FAFE" }}>
                        <p>Total Expenses</p>
                        <h1>3000 vnđ</h1>
                    </div>
                </div>
                <div className="chart">
                <ChartComponent/>

                </div>
            </div>
            <div className="table">
                <h1>this is table</h1>
            </div>
        </div>
    )
};
export default DashBoard;