import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../component/nav/adminNav";
import { useSelector } from "react-redux";
import {
    createCategory,
    removeCategory, getCategories
} from "../../../function/category"
import {Prompt} from "react-router"

import CategoryForm from "../../../component/form/CategoryFrom";
import {Link } from "react-router-dom"
import {EditOutlined,DeleteOutlined} from "@ant-design/icons"
import LocalSearch from "../../../component/form/LocalSearch"
const CategoryCreate = () => {
    const formIsHalfFilledOut=()=>
{
//
}
    const {user }= useSelector((state)=>({...state}));

    const [name, setName] = useState("");
    const [loading ,setloading]=useState(false);
    const [categories,setcategoris]=useState([]);
//search
const [keyword,setkeyword]=useState("")
    useEffect(()=>{
loadCategories();
    },[])

    const loadCategories=()=>
    getCategories().then((c)=>
    setcategoris(c.data));


    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(name);
        setloading(true)
        createCategory({name},user.token)
        .then((res)=>
            {
                setloading(false)
                setName("")
                toast.success(`"${res.data.name}" is created`)
                loadCategories();
            })
        .catch((err)=>{
            console.log(err)
            setloading(false)
            if(err.response.status===400) toast.error(err.response.data);
            loadCategories();

                    }
        )
    }


    const handleRemove =async (slug)=>
    {
        let answer =window.confirm("Are you sure Bro?")
        if(answer ===true){
            setloading(true)
            removeCategory(slug ,user.token)
            .then(
                (res)=>
                {
                    setloading(false);
                    toast.error(`${res.data.name} deleted`)
                    loadCategories();

                }
            )
            .catch((err)=>
            {
                if(err.response.status===400)
                {
                    setloading(false)
                    toast.error(err.response.data)
                }
            })
        }
    }

  

    //

    const searched =(keyword)=>(c)=>
    c.name.toLowerCase().includes(keyword)
    


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading?(<h4 className="text-danger">Loading....</h4>):
                <h4>Create Category</h4>}
                         <CategoryForm handleSubmit={handleSubmit}
                         name={name}
                         setName={
                             setName
                         }
                         />  

                         <LocalSearch keyword={keyword} setkeyword={setkeyword}/>


                        <hr />
                        {categories.filter(searched(keyword)).map((c)=>
                        (
                            <div className="alert alert-secondary" key={c.id}>
                                {c.name}
                                 <span onClick={()=> handleRemove(c.slug)}
                                 className="btn btn-sm float-right">
                                     <DeleteOutlined className="text-danger"/></span>{""}
                                <Link to={`/admin/category/${c.slug}`}><span className="btn btn-sm float-right"><EditOutlined className="text-warning"/></span></Link>
                                </div>
                        ))}
                         <Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
                     </div>
            </div>
            </div>
    )
    }
export default CategoryCreate;