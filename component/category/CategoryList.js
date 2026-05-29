import React ,{useState,useEffect}from "react"
import {Link} from "react-router-dom"
import {getCategories} from "../../function/category"

const CategoryList=()=>
{
    const [categories,setcategories]=useState([])
    const [loading,setloading]=useState(false);

    useEffect(()=>
    {
        setloading(true);
    getCategories().then((c)=>{
        setcategories(c.data)
        setloading(false);
    })  ;
  },[])

  
    return(
<div className="container">
    <div className="row">
        {loading ? (
            <h4 className="text-center">Loading...</h4>
        ):
       ( categories.map((c)=>
       (
           <div key={c._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
             <Link to={`/category/${c.slug}`}> {c.name}</Link> 
             
         <h4>
            
         </h4>
           </div>
       )))
        }

    </div>
</div>
    )
}

export default CategoryList;