
import "./CSS/MainPage.css";
const Sidebar =()=>{
  const role = sessionStorage.getItem("role");
  console.log("role num",role);
  
   return(
    <>
      <div className="sidebar">
        <div className="logo">
          <img src="./image/finance.png" alt="logo"/>
        </div>
        <ul>
          <li><a href="/expense_tracking/home"><i className="bi bi-bar-chart-line-fill"></i> DASH BOARD</a></li>
          <li><a href="/expense_tracking/home/income"><i className="fa-solid fa-money-check-dollar"></i> INCOME</a></li>
          <li><a href="/expense_tracking/home/expense"><i className="fa-solid fa-money-bills"></i> EXPENSE</a></li>
          {(role == 1)&&(<li><a href="/expense_tracking/home/user"><i className="fa-solid fa-money-bills"></i> User</a></li>)}
          <li><a href=""><i className="bi bi-bell-fill"></i> TAX</a></li>
          <li><a href="/expense_tracking/home/share_table"><i className="bi bi-gear-fill"></i> SHARING EXPENSES</a></li>
          <li><a href="/expense_tracking/home/profile"><i className="bi bi-gear-fill"></i> PROFILE</a></li>
        </ul>
      </div>
    
    </>
   )
}
export default Sidebar;