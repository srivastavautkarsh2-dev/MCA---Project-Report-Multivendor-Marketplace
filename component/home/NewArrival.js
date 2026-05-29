import { getProducts ,getproductsCount} from "../../function/product"
import React, { useState, useEffect } from "react";
import  ProductCard from "../cards/ProductCard"
import Jumbotron from "../cards/Jumbotron"
import LoadingCard from "../cards/LoadingCard"
import {Pagination} from "antd"
const NewArrival=() =>
{
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false);
    const [page,setpage]=useState(1);
    const [productcount,setproductcount]=useState(0)
useEffect(()=>
    {
        loadAllProduct();
    },[page])

    useEffect(()=>{
        getproductsCount().then(res=>setproductcount(res.data));
    },[])
const loadAllProduct=()=>
{setloading(true);
    /////sort,order,limit
    getProducts("createdAt","desc",page).then((res)=>
    {
        setproducts(res.data)
        setloading(false);
    })
}
    return(
        <>
        

     

        <div className="container">
           {loading ?
           (
               <LoadingCard count={3}/>
           ):
           (
            <div className="row">
                {products.map((product)=>
                (
                    <div className="col-md-4" key={product._id}
                    >
                        <ProductCard product={product}/>                      </div>
                ))}
            </div>)
            }
        </div>

       <div className="row">
           <nav className="col-md-4 offset-md-4 text-center pt-5 p-3" >
           <Pagination 
        current={page}
        total={(productcount/3)*10}
        onChange={(value)=>setpage(value)}
    
        />
           </nav>
       </div>
        </>
    )
}

export default NewArrival;