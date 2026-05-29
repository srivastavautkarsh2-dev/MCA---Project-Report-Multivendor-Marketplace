import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

const Forgorpassword = ({history}) => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState("");

  const {user}=useSelector((state)=>({...state}));

  useEffect(()=>
  {
      if(user && user.token) 
      history.push("/");
  },[user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setemail("");
        setloading(false);
        toast.success("check your email in password reset link");
      })
      .catch((error) => {
        setloading(false);
        toast.error(error.message);
        console.log("error message in forgot password", error);
      });
  };
  return (
    <div className="container col-6 offset-md-3 p-5 ">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="type email"
          autoFocuss
        />

        <br />

        <button type="submit" className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forgorpassword;
