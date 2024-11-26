
import Expense_DashBoard from "./Expense_DashBoard";
import Income_DashBoard from "./Income_Dashboard";
import Sidebar from "./Sidebar";

const Expense = () => {
    return (<>
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Expense_DashBoard />
            </div>
        </div></>)

}
export default Expense;