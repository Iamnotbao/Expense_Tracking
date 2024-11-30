import Share_Expense_Table from "./Share_Expense_Table";
import Sidebar from "./Sidebar";
const Share_Expense =()=>{
    return(<>
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Share_Expense_Table/>
            </div>
        </div>
    </>)
}
export default Share_Expense;