import React, { Children, useState,useEffect } from 'react';
import { Link, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import {currentAdmin} from "../../function/auth"
const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) =>
    ({
        ...state
    }));
    const [ok,setok] = useState(false);
    useEffect(() => {
        if (user && user.token) {
          //  console.log("hhhhhhhh")
            currentAdmin(user.token)
        .then(res => {
          //  console.log("CUREENT ADMIN RES", res)
            setok(true)
        })
        .catch(err => {
            console.log("ADMIN ROUTE ERR", err)
            setok(false)
        });
}
    }, [user]);

return ok  ? (
    <Route{...rest}/>)
    : (
        <LoadingToRedirect />
    )
}

export default AdminRoute;