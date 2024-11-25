import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { useState, useEffect } from 'react';
import 'datatables.net-responsive-dt';
import "./CSS/table.css"
import $ from "jquery";
DataTable.use(DT);
function Table() {

    const [tableData, setTableData] = useState([
        [ 'Tiger Nixon', 'System Architect' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'dodangquang', 'abc' ],
        [ 'Garrett Winters', 'Accountant' ],
        [ 'Garrett Winters', 'Accountant' ],

        // ...
      ]);
     
      return (
            <DataTable data={tableData} className="display"options={{
                responsive: true,
                select: true,
            }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Name</th>
                        
                    </tr>
                </thead>
            </DataTable>
        );
}

export default Table;
