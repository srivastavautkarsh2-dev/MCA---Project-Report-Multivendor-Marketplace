import React, { useEffect } from 'react';
import {Switch , Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgotpassword from './pages/auth/Forgotpassword'
import Header from './component/nav/Header'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import RegisterComplete from './pages/auth/RegisterComplete'
//import {createstore } from 'redux';
//import {Provider} from 'react-redux';
//import { composeWithDevTools} from 'redux-devtools-extension';
import {auth } from './firebase';
import {useDispatch} from 'react-redux';
import {currentUser} from './function/auth'
import History from "./pages/user/History"
import UserRoute from "./component/routes/userRoutes"
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AdminRoute from "./component/routes/AdminRoute"
import CategoryCreate from "./pages/Admin/category/CategoryCreate"
import CategoryUpadte from "./pages/Admin/category/CategoryUpdate"
import SubCreate from "./pages/Admin/SubCategory/SubCreate"
import SubUpadte from "./pages/Admin/SubCategory/SubUpdate"
import ProductCreate from "./pages/Admin/product/productCreate"
import AllProducts from "./pages/Admin/product/AllProduct"
import ProductUpdate from "./pages/Admin/product/ProductUpdate"
import Product from "./pages/Product"
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/Sub/SubHome";
import Cart from "./pages/cart"
import SideDrawer from "./component/drawer/sideDrawer"
//import ProductCard from './component/cards/ProductCard';
import Shop from "./pages/shop"
import CheckOut from "./pages/Checkout"
import CreateCouponPage from "./pages/Admin/coupon/createCoupon"
import Payment from "./pages/payment"



const  App=()=> {
 // const {user}=useSelector((state)=>({...state}));

  const dispatch=useDispatch();
  useEffect(()=>
  {
const unsubscribe =auth.onAuthStateChanged(async (user) =>
{
  if(user)
  {
    const idTokenResult= await user.getIdTokenResult();
console.log("user",user)
currentUser(idTokenResult.token)
.then((res)=>
{
  dispatch({
    type:'LOGGED_IN_USER',
    payload:{
     
        email:res.data.email,
        name:res.data.name,
        token:idTokenResult.token,
        role:res.data.role,
        _id:res.data._id,
    },})
})
.catch()
  }
});
return()=>unsubscribe();
  })
  return (
    <>
<Header/>
<SideDrawer/>
<ToastContainer/>
   <Switch>
     <Route exact path="/" component={Home}/>
     <Route exact path="/Login" component={Login}/>
     <Route exact path="/Register" component={Register}/>
     <Route exact path="/Register/complete" component={RegisterComplete}/>
     <Route exact path="/forgot/Password" component={Forgotpassword}/>
     <UserRoute exact path="/user/history" component={History}/>
     <UserRoute exact path="/user/password" component={Password}/>
     <UserRoute exact path="/user/wishlist" component={Wishlist}/>
     <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
     <AdminRoute exact path="/admin/category" component={CategoryCreate}/>
     <AdminRoute exact path="/admin/category/:slug" component={CategoryUpadte}/>
     <AdminRoute exact path="/admin/sub" component={SubCreate}/>
     <AdminRoute exact path="/admin/sub/:slug" component={SubUpadte}/>
     <AdminRoute exact path="/admin/product" component={ProductCreate}/>
     <AdminRoute exact path="/admin/products" component={AllProducts}/>
     <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate}/>
     <AdminRoute exact path="/admin/coupun" component={CreateCouponPage}/>
<Route exact path="/product/:slug" component={Product}/>
<Route exact path="/category/:slug" component={CategoryHome}/>
<Route exact path="/sub/:slug" component={SubHome}/>
<Route exact path="/shop" component={Shop}/>
<Route exact path="/cart" component={Cart}/>
<UserRoute exact path="/checkout" component={CheckOut} />
<UserRoute exact path="/payment" component={Payment}/>


   </Switch>
   </> 
  );
}

export default App;
