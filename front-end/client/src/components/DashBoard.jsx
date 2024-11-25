import React from "react";
import Chart from 'chart.js/auto';
import "./CSS/DashBoard.css"
import { useRef, useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import Table from "./Table";
const DashBoard = () => {
    const tableRef = useRef(null);
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
                    <ChartComponent />

                </div>
            </div>
            <div className="table">
         
                    <Table/>

            </div>
        </div>
    )
};
export default DashBoard;