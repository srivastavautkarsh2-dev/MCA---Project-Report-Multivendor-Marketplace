import React ,{useState,useEffect}from "react"
import {Link} from "react-router-dom"
import {getsubs} from "../../function/sub"

const SubList=()=>
{
    const [subs,setsubs]=useState([])
    const [loading,setloading]=useState(false);

    useEffect(()=>
    {
        setloading(true);
        getsubs().then((c)=>{
        setsubs(c.data)
        setloading(false);
    })  ;
  },[])

  
    return(
<div className="container">
    <div className="row">
        {loading ? (
            <h4 className="text-center">Loading...</h4>
        ):
       ( subs.map((c)=>
       (
           <div key={c._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
             <Link to={`/sub/${c.slug}`}> {c.name}</Link> 
             
         <h4>
            
         </h4>
           </div>
       )))
        }

    </div>
</div>
    )
}

export default SubList;