import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';

const LoadingToRedirect =()=>
{
    const [count,setcount]=useState(5);

let history=useHistory();
useEffect(()=>
{
    const interval =setInterval(()=>
    {
        setcount((currentCount)=>
        --currentCount);
    },1000)

    count ===0 && history.push("/");
    //cleanup karna h
    return ()=>
    clearInterval(interval);

},[count])

return <div className="container p-5 text-center">
   <p>Redirecting you in {count} seconds</p> 
</div>

}

export default LoadingToRedirect;