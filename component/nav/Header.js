import React,{useState} from 'react';
import { Menu,Badge } from 'antd';
import { MailOutlined,
     AppstoreOutlined,
      SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined
   } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
//import {useHistory} from 'react-router-dom'
import Search from "../form/Search"
import firebase from 'firebase'
const { SubMenu ,Item} = Menu;

const Header = () =>

{

    const [current,setcurrent]=useState("home");
    const dispatch=useDispatch();
   
    let {user,cart}=useSelector((state)=>({...state}));
    const history=useHistory();

    const handleClick=(e)=>
    {
        console.log(e.key)
        setcurrent(e.key);
    }
    const logout=()=>
    {
        firebase.auth().signOut();
dispatch({
    type:"LOGGED_OUT",
    payload:null,
});
history.push("/login")
    }
    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
    <Link to="/">Home </Link> 
        </Item>

        <Item key="shop" icon={<ShoppingOutlined />}>
    <Link to="/shop">Shop </Link> 
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
    <Link to="/cart">
        <Badge count={cart.length} offset={[9,0]}> 
            Cart</Badge> </Link> 
        </Item>
       {!user && <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">register</Link> 
        </Item>}
       
       {!user && <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link> 
        </Item>}

      
       
        
    {user&& <SubMenu key="SubMenu" icon={<SettingOutlined />} 
    title={user.email &&  user.email.split("@")[0]}
    className="float-right">
        
         
           {user && user.role ==='Subscriber' &&(
              <Item>
                  <Link to ="/user/history">Dashboard</Link>
              </Item> 
           )}

{user && user.role ==='admin' &&(
              <Item>
                  <Link to ="/admin/dashboard">Dashboard</Link>
              </Item> 
           )}
          <Item icon={<LogoutOutlined/>} onClick={logout} >
              Logout
          </Item>
        </SubMenu>}
        

        <span className="float-right p-1">
            <Search/>
        </span>
    
      </Menu>
    )
}

export default Header;