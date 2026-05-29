import React, { useState,useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import {Button} from 'antd';
import { MailOutlined,
    
   GoogleOutlined

  } from '@ant-design/icons';
  import {useDispatch,useSelector} from 'react-redux';
  import {Link } from 'react-router-dom';
 import{createOrUpdateUser} from '../../function/auth'
 


 
const Login = ({history}) => {
  const [email, setemail] = useState("amansinghgaur00194@gmail.com");
  const [password, setpassword] = useState("amangaur");
  const [loading,setloading]=useState("");

  const {user}=useSelector((state)=>({...state}));

  useEffect(()=>
  {
    let intended=history.location.state;
if(intended)
{return;
}
else{
  if(user && user.token) 
  history.push("/");
}
      
  },[user,history]

   );
  const dispatch=useDispatch();
 
  const roleBasedRedirect =(res)=>
 { 
   let intended=history.location.state;
  if(intended)
  {
    history.push(intended.from)
  }
  else{
    if(res.data.role === "admin")
    {
    history.push("/admin/dashboard");
    console.log(res.data.role);
    }
    else
    {
    history.push("/user/history")
    }
  }
 };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try{
const result=await auth.signInWithEmailAndPassword(email,password);

const {user}=result;
const idTokenResult=await user.getIdTokenResult();


createOrUpdateUser(idTokenResult.token)
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
    roleBasedRedirect(res);
})
.catch()


//history.push("/")

    }
    catch(error)
    {
console.log(error)
toast.error(error.message);
setloading(false);
    }
    console.table(email,password)
  };

  const googlelogin =async () =>
  {
    auth.signInWithPopup(googleAuthProvider)
    .then(async(result)=>
    {
        const {user}=result;
const idTokenResult=await user.getIdTokenResult();
createOrUpdateUser(idTokenResult.token)
.then((res)=>
{
  dispatch({
    type:'LOGGED_IN_USER',
    payload:{
email:user.email,
name:res.data.email,
token:idTokenResult,
role:res.data.role,
_id:res.data._id,
    },})
    roleBasedRedirect(res);
})
.catch()
//history.push("/")
    }).catch((err)=>
    {
        console.log(err);
        toast.error(err.message)
    }
    )}
  const loginform = () => {
    return (
      <form onSubmit={handleSubmit}>
          <div className="form-control">

        
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          
        />
          </div>
          <div className="form-control">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
          </div>
<br/>
        <Button 
        onClick={handleSubmit}
        type="primary" 
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined/>}
        size="large"
        disabled= {!email || password.length<6 }>
          Login with Email/Password
        </Button>
      </form>
      
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        {!loading ? (<h4>Login</h4>):(<h4 className="text-danger">Loading ..</h4>)}

          {loginform()}

           <Button 
        onClick={googlelogin}
        type="danger" 
        className="mb-3"
        block
        shape="round"
        icon={<GoogleOutlined/>}
        size="large"
        >
          Login with Google
        </Button>

        <Link to="/forgot/Password" className="float-right text-danger">
        forgot password
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
