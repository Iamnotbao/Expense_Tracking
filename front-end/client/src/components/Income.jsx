
import Income_DashBoard from "./Income_Dashboard";
import Sidebar from "./Sidebar";

const Income = () => {
    return (<>
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Income_DashBoard />
            </div>
        </div></>)

}
export default Income;