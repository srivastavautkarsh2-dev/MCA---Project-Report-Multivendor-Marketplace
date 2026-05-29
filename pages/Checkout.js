import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserCart,emptyUserCart ,saveAddressuser,applyCoupon} from "../function/user"
import {toast} from "react-toastify"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
//import getTotal from "../pages/cart"
const CheckOut = ({history}) => {

    const [products, setproducts] = useState([]);
    const { user ,cart,coupon} = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    const [total, settotal] = useState(0)
    const [address,setaddress]=useState("")
    const [coupons,setcoupons]=useState('')
    const [totalafterdisscount,settotalafterdisscount]=useState(0)
    const [diserr,setdiserr]=useState('')

const [addresssaved ,setaddresssaved]=useState(false);
    useEffect(() => {
        getUserCart(user.token).then((res) => {
            console.log("user cart ", JSON.stringify(res.data, null, 4))
            setproducts(res.data.products)
            settotal(res.data.cartTotal)
        })
    }, [])

    const saveAddressToDb = () => {
        saveAddressuser(user.token,address).then((res)=>
        {
            if(res.data.ok)
            {
                setaddresssaved(true)
                toast.success("Address saved")
            }
        })
    };
    const emptyCart=()=>
    {
        if(typeof window !== "undefined")
        {
            localStorage.removeItem("cart")
        }
        dispatch({
            type:"ADD_TO_CART",
            payload:[],
        })
        emptyUserCart(user.token).then((res)=>
        {
            setproducts([]);
            settotalafterdisscount(0)
            setcoupons("")
            settotal(0);
            toast.success("cart is empty . continue Shopping")
        })
    }
    const showAddress=()=>
    (<>
<ReactQuill theme="snow" value ={address} onChange={setaddress}
/>
             <button className="btn btn-primary mt-2"
                    onClick={saveAddressToDb}>
                    Save
                </button>
                </>
    )
    const showProductSummary=()=>
    (
<>
{products.map((p,i)=>
(
    <div key={i}>
        <p>
            {p.product.title} ({p.color}) x {p.count} ={" "}
            {p.product.price * p.count}
        </p>
        </div>
))}  
</>
    )
    const applyDiscountCoupon=()=>
    {
        console.log(coupons)
        applyCoupon(user.token,coupons)
        .then((res)=>
        {
            console.log("res on coupon applied",res)
            if(coupons==="AMANGAUR" || "2021feb")
            { 
                settotalafterdisscount(getTotal())
                //redux
                dispatch({
                    type:"COUPON_APPLIED",
                    payload:true,
                })
            }
            if(coupons!=="AMANGAUR" && coupons!=="2021FEB" )
            {
                setdiserr("ERROR")
                //redux
                dispatch({
                    type:"COUPON_APPLIED",
                    payload:true,
                })
            }
        })
    }

    const showApplyCoupon=()=>
    (
        <>
        <input
        onChange={(e)=>{setcoupons(e.target.value)
        setdiserr("")}}
        value={coupons}
        type="text"
        className="form-control"

        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
        </>
    )

    const getTotal = () => {
        return (
            cart.reduce((currentValue, nextValue) => {
                return currentValue = currentValue + (nextValue.count * nextValue.price)
            }, 0)
        )
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
{showAddress()}
                <hr />
                <h4>
                    Got Coupon
                </h4>
                <br />
{showApplyCoupon()}    
<br/>
{diserr && <p className="bg-danger p-2">{diserr}</p>}   
     </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>
                    Products {products.length}
                </p>
                <hr />

{showProductSummary()}       
       <br />
               
                <hr />
                <p>
                    Cart Total :Rs<b>{getTotal()}</b>
                    {totalafterdisscount>0 && (
                        <p className="bg-success p-2">
                            Discount Applied :Total Payable : Rs{totalafterdisscount-((25/100)*totalafterdisscount)}
                        </p> 
                    )}
                    </p>
                <div className="row">
                    <div className="col-md-6" >
                        <button className="btn btn-primary" 
                        disabled={!addresssaved || !products.length}
                        onClick={()=>history.push("/payment")}
                        > 
                        Place order</button>
                    </div>
                    <div className="col-md-6">
                        <button
                        disabled={!products.length}
                        onClick={emptyCart}
                        className="btn btn-primary"> Empty Cart</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CheckOut;