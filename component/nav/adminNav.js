//import React from "react";
import {Link } from "react-router-dom";
import React from "react";
const AdminNav =()=>
{
    return(
    <nav>
        <ul className="nav flex-column">
            <li className="nav-tems">
                <Link to="/admin/dashboard" className="nav-link">
                    Dashboard
                </Link>
            </li>

            <li className="nav-tems">
                <Link to="/admin/product"  className="nav-link">
                    Product Management
                </Link>
            </li>
            <li className="nav-tems">
                <Link to="/admin/products" className="nav-link">
                    All products
                </Link>
            </li>
            <li className="nav-tems">
                <Link to="/admin/Category" className="nav-link">
                    Category
                </Link>
            </li>
            <li className="nav-tems">
                <Link to="/admin/sub" className="nav-link">
                    Sub category
                </Link>
            </li>
            <li className="nav-tems">
                <Link to="/admin/coupun" className="nav-link">
                    coupun
                </Link>
            </li>
            <li className="nav-tems">
                <Link to="/admin/password" className="nav-link">
                    Password
                </Link>
            </li>

            

        </ul>
    </nav>
    )
}

export default AdminNav;