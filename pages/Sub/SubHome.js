import React, { useEffect, useState } from "react"
import {getsub } from "../../function/sub"
import ProductCard from "../../component/cards/ProductCard"


const CategoryHome = ({ match }) => {
    const [sub, setsub] = useState({});
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)
    const { slug } = match.params;
    useEffect(() => {
        setloading(true)
        getsub(slug).then(c=>
    {
        setsub(c.data.sub)
        setproducts(c.data.products)
        setloading(false)
    })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ? (
<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" >
    loading...

</h4>
                    ):(
<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" >
  {products.length} Products in "{sub.name}" sub category

</h4>
                    )}
                </div>

            </div>
<div className="row">
    {products.map((p)=>(
        <div className="col-md-4" key={p._id}>
            <ProductCard product={p}/>
            </div>
    ))}

</div>
        </div>
    )
}

export default CategoryHome;
