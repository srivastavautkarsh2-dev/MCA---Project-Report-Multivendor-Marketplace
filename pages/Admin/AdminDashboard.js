import React ,{ useState, useEffect } from "react";
import AdminNav from "../../component/nav/adminNav"
//import { Line } from 'react-chartjs-2';
import { Bar, Line, Pie } from 'react-chartjs-2';


const AdminDashboard = () => {
   

    // set options
    const [barData, setBarData] = useState({
        labels: [' Tshirt', 'Shirt', ' Jeans', ' Kurti',"Saree"],
        datasets: [
            {
                label: 'test label',
                data: [
                    48,
                    35,
                    73,
                    82,5
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 156, 92, 0.6)'

                ],
                borderWidth: 3
            }
        ]
    });
    // set options
    const [barOptions, setBarOptions] = useState({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Sale Status',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });
    

      
      

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                
               

                <div className="col">
<h4>
    Admin dashboard
</h4>
<Bar
            data={barData}
            options={barOptions.options} />

                    </div>
                </div>
            </div>
    


    )
}
export default AdminDashboard;