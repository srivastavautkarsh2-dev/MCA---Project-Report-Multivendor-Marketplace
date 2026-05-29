import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../component/nav/adminNav";
import { useSelector } from "react-redux";
import {
    updateCategory
    ,
    getCategory
} from "../../../function/category"
import CategoryForm from "../../../component/form/CategoryFrom";

const CategoryUpadte = ({history,match}) => {
    const {user }= useSelector((state)=>({...state}));

    const [name, setName] = useState("");
    const [loading ,setloading]=useState(false);

    useEffect(()=>{
loadCategory();
    },[])

     const loadCategory=()=>
     getCategory(match.params.slug).then((c)=>
    setName(c.data.name));


    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(name);
        setloading(true)
        updateCategory(match.params.slug,{name},user.token)
        .then((res)=>
            {
                setloading(false)
                setName("")
                toast.success(`"${res.data.name}" is updated`)
                history.push("/admin/category")
                
            })
        .catch((err)=>{
            console.log(err)
            setloading(false)
            if(err.response.status===400) toast.error(err.response.data);
            

                    }
        )
    }


    // const handleRemove =async (slug)=>
    // {
    //     let answer =window.confirm("Are you sure Bro?")
    //     if(answer ===true){
    //         setloading(true)
    //         removeCategory(slug ,user.token)
    //         .then(
    //             (res)=>
    //             {
    //                 setloading(false);
    //                 toast.error(`${res.data.name} deleted`)
    //                 loadCategories();

    //             }
    //         )
    //         .catch((err)=>
    //         {
    //             if(err.response.status===400)
    //             {
    //                 setloading(false)
    //                 toast.error(err.response.data)
    //             }
    //         })
    //     }
    // }
    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading?(<h4 className="text-danger">Loading....</h4>):
                <h4>Update Category</h4>}
<CategoryForm handleSubmit={handleSubmit}
                         name={name}
                         setName={
                             setName
                         }
                         />
                        <hr />
                    
                     </div>
            </div>
            </div>
    )
    }
export default CategoryUpadte;