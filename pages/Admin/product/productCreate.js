import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../component/nav/adminNav";
import { useSelector } from "react-redux";
import { createProduct } from "../../../function/product"
import ProductCreateForm from "../../../component/form/ProductCreateForm"
import {
    getCategories,getCategorySubs
} from "../../../function/category"
import { LoadingOutlined } from "@ant-design/icons";
import FileUplaod from "../../../component/form/fileUpload"
const ProductCreate = () => {
    const initialState = {
        title: '',
        description: '',
        price: '',
        category: '',
        categories: [],
        subs: [],
        shipping: '',
        quantity: '',
        images: [],
        colors: ["black", "white", "red", "pink", "babypink"],
        brands: ["puma","adidas","levis","roadster","pepeJeans"],
        color: '',
        brand: '',
    };
    const [values, setvalues] = useState(
        initialState
    );
    const [subOptions,setSubOptions]=useState([]);
const [showSub,setShowSub]=useState(false)
    const { user } = useSelector((state) => ({ ...state }))
const [loading,setloading]=useState(false);
    useEffect(()=>{
        loadCategories();
            },[]);
        
            const loadCategories=()=>
            getCategories()
            .then((c)=>
            setvalues({...values,categories:c.data}))

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {
                console.log("hhhhh") 
                console.log(res);
                window.alert(`"${res.data.title}"is created`)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
           // if (err.response.status === 400) toast.error(err.response.data)
           toast.error(err.response.data.err)
            })

    };
    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name,"-----",e.target.value)
    }

    const handleCategoryChange=(e)=>
    {
        e.preventDefault();
        console.log("clicked category",e.target.value);
        setvalues({...values,subs:[],category:e.target.value})
        getCategorySubs(e.target.value).then((res)=>
        {console.log("sub",res)
        console.log(res.data)
        
            setSubOptions(res.data);
        })
        setShowSub(true)

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />

                </div>

                <div className="col-md-10">
                    {loading?(
                        <LoadingOutlined className="text-danger h1"/>):(
                            <h4>Product create</h4>
                        )
                    }

                
                <div className="col-md-10">
                

                    <hr />

                    <div className="p-3">
                        <FileUplaod 
                        values={values}
                        setvalues={setvalues}
                        setloading={setloading}/>
                    </div>
                    <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions}
                    setvalues={setvalues}
                    showSub={showSub}/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProductCreate;