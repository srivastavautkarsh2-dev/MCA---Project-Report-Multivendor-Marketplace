import { getProductByCount,getProducts } from "../function/product"
import React, { useState, useEffect } from "react";
import  ProductCard from "../component/cards/ProductCard"
import Jumbotron from "../component/cards/Jumbotron"
import LoadingCard from "../component/cards/LoadingCard"
import BestSeller from "../component/home/BestSeller"
import NewArrival from "../component/home/NewArrival"
import CategoryList from "../component/category/CategoryList"
import SubList from "../component/sub/subList"

const Home=() =>
{
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false);
useEffect(()=>
    {
        loadAllProduct();
    },[])
const loadAllProduct=()=>
{setloading(true);
    /////sort,order,limit
    getProducts("createdAt","desc",3).then((res)=>
    {
        setproducts(res.data)
        setloading(false);
    })
}
    return(
        <>
        <div className="jumbotron text-danger h1 font-weight-bold text-center" >
            <Jumbotron text={[ 'Login For a Add , edit and delete the product']} />
            
        </div>

        <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
            New Arrival
        </h4>



      <NewArrival/>


      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
            Best Seller
        </h4>

<BestSeller/>


<h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        Categories
        </h4>

<CategoryList />

<h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
SubCategory        </h4>

<SubList />

      <br/>
      <br/>
      <p className="text-center p-3 mb-5 ">
          Login For a Add , edit and delete the product
      </p>
        </>
    )
}

export default Home;