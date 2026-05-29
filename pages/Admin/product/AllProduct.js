import React, { useState, useEffect } from "react";
import AdminNav from "../../../component/nav/adminNav"
import { getProductByCount ,removeProduct} from "../../../function/product"
import AdminProductCard from "../../../component/cards/AdminProductCard"
import { toast } from "react-toastify";
import {useSelector} from "react-redux"
const AllProducts = () => {
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false);
const {user}=useSelector((state)=>({...state}))
    useEffect(() => {
        loadAllproducts()
    }, [])

    const loadAllproducts = () => {
        setloading(true)
        getProductByCount(100)
            .then((res) => {
                setproducts(res.data)
                setloading(false)
            })
            .catch((err) => {
                setloading(false)
                console.log("errrrrrrr", err)
            })
    }
    const handleRemove=(slug)=>
    {
        if(window.confirm('delete'))
        {
console.log("send delete reqest",slug)
removeProduct(slug,user.token)
.then(res=>
    {
loadAllproducts();
toast.error(`${res.data.title} is deleted`)
    })
    .catch(err=>
        {
            if(err.response.status===400) toast.error(err.response.data)
            console.log(err)
        })

        }
    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
               

                <div className="col">
                {loading ? (<h4 className="text-danger">loading...</h4>) : (<h4>
                    All products
                </h4>)}
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id}
                                className="col-md-4 pd-3">
                                <AdminProductCard
                                    product={product}
                                    handleRemove={handleRemove}
                                />
                            </div>
                        )
                        )
                        }
                    </div>
                </div>
            </div>
        </div>


    )
}
export default AllProducts;