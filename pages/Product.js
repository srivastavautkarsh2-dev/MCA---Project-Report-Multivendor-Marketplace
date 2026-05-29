import React,{useState,useEffect} from "react";
import{getProduct,productStar} from "../function/product"
import SingleProduct from "../component/cards/SingleProduct";
import {useSelector } from "react-redux"
import {getRealted} from "../function/product"
import ProductCard from "../component/cards/ProductCard"
const Product=({match})=>
{
    const [product,setproduct]=useState({});
    const [related,setrelated]=useState([])
const [star,setstar]=useState(0)
    const {slug}= match.params
const {user}=useSelector((state)=>({...state}))
const loadSingleproduct=()=>
    {
getProduct(slug).then((res)=>
{
setproduct(res.data);
getRealted(res.data._id).then(res =>
  setrelated(res.data))
})  
  }
    useEffect(()=>
    { 
loadSingleproduct()
    },[slug]);

    

  const onStarClick=(newRating,name)=>
  {
    setstar(newRating)
    productStar(name,star,user.token).then((res)=>{
      console.log("rating clicked",res.data);
      loadSingleproduct();
    })

//console.table(newRating,name)
  }
  useEffect(()=>
  {
    if(product.rating && user)
    {
      let existingRatingObject=product.ratings.find((ele)=>
    ele.postedBy.toString() === user._id.toString()
    );
    existingRatingObject && setstar(existingRatingObject.star)
    }
  }, [product.rating, product.ratings, user])

  return(
     <div className="container-fluid">
         <div className="row pt-4">
             <SingleProduct
             product={product}
             onStarClick={onStarClick}
             star={star} />
  </div>
  <div className="row ">
<div className="col text-center pt-5 pb-5">
    <hr/>
    <h4>Related Products</h4>
    <hr/>
</div>
  </div>
  <div className="row pb-5">
    {related.length?
    related.map((r)=>
  (
    <div key={r._id} className="col-md-4">
      <ProductCard product={r} />
    </div>
  ))
:<div className="text-center col">
  No Products found
</div>
}

  </div>

     </div>

  )
}

export default Product