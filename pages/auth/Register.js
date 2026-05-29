import React,{useState,useEffect} from 'react';
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch,useSelector} from 'react-redux';





const Register =({history}) =>
{
    const [email,setemail]=useState("");

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>
    {
        if(user && user.token) 
        history.push("/");
    },[user]);
  

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL)
        const config=
        {
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email,config);
        toast.success(
            `Email is sent to ${email} .Click the link to complete your  registration`);
           
         //local storage m save karne k liye
         window.localStorage.setItem('email for registration',email);
         //state clear karne k liye
         setemail("");
    };
    const registerform =() =>

    {return(
        <form onSubmit={handleSubmit}>
            <input 
            type="email"
            className="form-control"
            value={email}
            onChange={(e)=> setemail(e.target.value)}
            autoFocus
            />

            <br/>

            <button type="submit" className="btn btn-raised">
                Register
                </button>
        </form>
    )
    };
    

  
     return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>
                        Register
                    </h4>
            
                       {registerform()}
                </div>
            </div>

            
        </div>
    )
}

export default Register;