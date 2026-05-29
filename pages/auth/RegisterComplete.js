import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {useDispatch,useSelector} from 'react-redux';
import{createOrUpdateUser} from '../../function/auth'






const RegisterComplete = ({ history }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {user}=useSelector((state)=>({...state}));
  const dispatch=useDispatch();


  useEffect(() => {
    setemail(window.localStorage.getItem(`email for registration`));
    console.log(window.location.href);
  }, []);

  //history

  const handleSubmit = async (e) => {
    e.preventDefault();
//validation

    if(!email || !password)
    {
        toast.error("email and password are required");
        return;
    }

        if(password.length < 6)
        {
            toast.error("password must be more than 6 digit");
            return;
    
        }


    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log("result", result);

      if(result.user.emailVerified)
      {
          //remove user email from local storage
          window.localStorage.removeItem("email for registration");
          //get user token
          let user=auth.currentUser
          await user.updatePassword(password);
        const idTokenResult= await  user.getIdTokenResult();
        //resux store
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
        })
        .catch()
        //redirect
       history.push();
        }
    } catch (error) {
    console.log(error)
    toast.error(error.message)
    }
  };
  const completeregisterform = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange ={(e) => setpassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />

        <br />

        <button type="submit" className="btn btn-raised">
          Register complete
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          {completeregisterform()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
