import React,{useState} from "react";
import Usernav from "../../component/nav/Usernav";
import {auth } from "../../firebase";
import {toast} from "react-toastify";


const Password =() =>

{
    const [password , setPassword]=useState("");
    const [loading , setLoading]=useState(false);

    const handleSumbit= async(e)=>{
        e.preventDefault()
        //
        await auth.currentUser.updatePassword(password)
        .then(()=>{
            setLoading(false);
            setPassword("")
            toast.success("Password updated")
        })
        .catch(err=>
            {
                setLoading(false);
                toast.error(err.message)
            })
    }

    const passwordUpdateFrom=()=>
    {
        return(
        <form onSubmit={handleSumbit}>
          <div className="form-group">
              <label>Your Password</label>
              <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              placeholder="enter new password"
              disabled={loading}
              value={password}
              />
              <button className="btn btn-primary"
              disabled={!password || password.length <6 ||loading }>
                  Submit
              </button>
          </div>
        </form>
        )
    }
    return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <Usernav/>
                
            </div>
            <div className="col">
                {loading ?
                (<h3 className="text-danger">
                    Loading...
                    </h3>):
                    (<h4>
                        Password Update
                    </h4>)}
                    {passwordUpdateFrom()}
            </div>
        </div>
    </div>
    )

}

export default Password;


