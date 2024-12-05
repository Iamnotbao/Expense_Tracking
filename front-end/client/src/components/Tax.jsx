
import Sidebar from "./Sidebar";
import Tax_DashBoard from "./Tax_Dashboard";

const Tax = () => {
    return (<>
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Tax_DashBoard />
            </div>
        </div></>)

}
export default Tax;