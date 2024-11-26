
import "./CSS/MainPage.css";
const Sidebar =()=>{
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
          <li><a href=""><i className="bi bi-wallet2"></i> TRANSACTIONS</a></li>
          <li><a href=""><i className="bi bi-bell-fill"></i> NOTIFICATION</a></li>
          <li><a href=""><i className="bi bi-gear-fill"></i> SETTING</a></li>
          
          
        </ul>
      </div>
    
    </>
   )
}
export default Sidebar;