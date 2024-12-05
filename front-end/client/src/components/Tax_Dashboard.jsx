import axios from "axios";
import { useEffect, useState } from "react";

const Tax_DashBoard=()=>{
    const[data,setData] = useState([]);
    const baseURL = "http://localhost:5000/taxDeduction"
    const token =sessionStorage.getItem("token");
    const userID = sessionStorage.getItem("userID");
    console.log(userID);
    
    useEffect(()=>{
        const fetch= async()=>{
try {
    const response = await axios.post(baseURL,{
        headers:{
            Authentication:`Bearer ${JSON.parse(token)}`
        },userID
    })
    if(response.data){
        setData(response.data.table12)
    }
    console.log("tax",response.data);
    
    
} catch (error) {
 console.log(error);
    
}
        }
        fetch();
    },[])
return( <>
    <div class="container">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8"><h2>Tax <b>Deduction</b></h2></div>
                        <div class="col-sm-4">
                            <div class="search-box">
                                <i class="material-icons">&#xE8B6;</i>
                                <input type="text" class="form-control" placeholder="Search&hellip;" />
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Month <i class="fa fa-sort"></i></th>
                            <th>Current Money<i class="fa fa-sort"></i></th>
                            <th>Tax Payment<i class="fa fa-sort"></i></th>
                            <th>Final Money<i class="fa fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item[index].username}</td>
                                    <td>
                                        {item.listExpense.length !== 0 ? (item.listExpense.map((ex) => (
                                            (ex.expense) ? (<p key={ex.expense._id}>{ex.expense.category}</p>) : ("loading")
                                        ))) : ("loading")}
                                    </td>
                                    <td>{item.expense}</td>
                                    <td>
                                        <a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                                        <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                        <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                                    </td>
                                </tr>
                            ))
                        ) : (<p>Loading</p>)}
                    </tbody>
                </table>
                <div class="clearfix">
                    <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul class="pagination">
                        <li class="page-item disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>
                        <li class="page-item"><a href="#" class="page-link">1</a></li>
                        <li class="page-item"><a href="#" class="page-link">2</a></li>
                        <li class="page-item active"><a href="#" class="page-link">3</a></li>
                        <li class="page-item"><a href="#" class="page-link">4</a></li>
                        <li class="page-item"><a href="#" class="page-link">5</a></li>
                        <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</>)
}
export default Tax_DashBoard;