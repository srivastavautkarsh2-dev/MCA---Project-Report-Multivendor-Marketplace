import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../component/nav/adminNav";
import { useSelector } from "react-redux";
import { getProduct } from "../../../function/product"
//import { createProduct, getProductByCount } from "../../../function/product"
//import ProductCreateForm from "../../../component/form/ProductCreateForm"
import {getCategories,getCategorySubs} from "../../../function/category"
import { LoadingOutlined } from "@ant-design/icons";
import FileUplaod from "../../../component/form/fileUpload"
import ProductUpdateForm from "../../../component/form/ProductUpdateForm"
import { updateProduct } from "../../../function/product"

const ProductUpdate = ({ match ,history}) => {


    const { user } = useSelector((state) => ({ ...state }))
    const { slug } = match.params;
    const initialState = {
        title: '',
        description: '',
        price: '',
        category: '',
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
    const [loading,setloading]=useState(false);

    const [subOptions,setSubOptions]=useState([]);
    const [categories,setcategories]=useState([])
const [arrayofSubsIds,setArrayofSubsIds]=useState([])
const [selectedCategory,setSelectedcategory]=useState("")
    useEffect(() => {
        loadproduct()
        loadCategories()
    }, [])

    const loadproduct = () => {
        getProduct(slug)
            .then(p => {
                //  console.log("single product",p)
                setvalues({ ...values, ...p.data })
                getCategorySubs(p.data.category._id).then((res)=>{
                    setSubOptions(res.data)
                })
                let arr=[];
                p.data.subs.map((s)=>
                (
                    arr.push(s._id)
                ))
                console.log(arr,"array")
                setArrayofSubsIds((prev)=>arr);
            })
    }

    const loadCategories=()=>
            getCategories()
            .then((c)=>
            setcategories(c.data))

    const handleSubmit=(e)=>
    {e.preventDefault();
    setloading(true)
    values.subs=arrayofSubsIds;
    values.category=selectedCategory?selectedCategory:values.category;
updateProduct(slug,values,user.token)
.then((res)=>
{
setloading(false);
toast.success(`${res.data.title} is updated`)
history.push("/admin")
})
.catch((err)=>
{
    console.log("error update",err)
toast.error(err.response.data.err)
})
}

    const handleChange=(e)=>
    {
        setvalues({...values,[e.target.name]:e.target.value})
    }

    const handleCategoryChange=(e)=>
    {
        e.preventDefault();
        console.log("clicked category",e.target.value);
        setvalues({...values,subs:[]})

        setSelectedcategory(e.target.value);

        getCategorySubs(e.target.value).then((res)=>
        {console.log("sub",res)
        console.log(res.data)
        
            setSubOptions(res.data);
        })
        //original back category wapas
        if(values.category._id===e.target.value)
        {
            loadproduct();
        }
        //clear and naya
setArrayofSubsIds([])
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />

                </div>
                <div className="col-md-10">
                    <h4>
                    {loading?(
                        <LoadingOutlined className="text-danger h1"/>):(
                            <h4>Product Update</h4>
                        )
                    }
                    </h4>
                    {/* {JSON.stringify(values)} */}
                    <div className="p-3">
                        <FileUplaod 
                        values={values}
                        setvalues={setvalues}
                        setloading={setloading}/>
                    </div>
                    <br/>
<ProductUpdateForm
handleSubmit={handleSubmit}
handleChange={handleChange}
setvalues={setvalues}
values={values}
handleCategoryChange={handleCategoryChange}
categories={categories} 
subOptions= {subOptions}
arrayofSubsIds={arrayofSubsIds}
setArrayofSubsIds={setArrayofSubsIds}
selectedCategory={selectedCategory}
/>
                    <hr />
                </div>

            </div>
        </div>
    )
}

export default ProductUpdate;