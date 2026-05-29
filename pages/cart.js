/* eslint-disable no-unreachable */
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import ProductCartInCheckOut from "../component/cards/ProductCartInCheckOut"
import {userCart} from "../function/user"
const Cart = ({history}) => {
    const { user, cart } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();
    const saveOrderToDb = () => {
      //  alert("save to dxb")
     //   history.push("/checkout")
     userCart(cart,user.token)
     .then((res)=>
     {
         console.log("cart post res",res);
         if(res.data.ok)
         history.push("/checkout")
     })
     .catch((err)=>console.log("cart post err",err))
    }

    const getTotal = () => {
        return (
            cart.reduce((currentValue, nextValue) => {
                return currentValue = currentValue + (nextValue.count * nextValue.price)
            }, 0)
        )
    }
    const showCartItems=()=>(
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image    </th>
                    <th scope="col">Title    </th>
                    <th scope="col">Price    </th>
                    <th scope="col">Brand    </th>
                     <th scope="col">color    </th>
                     <th scope="col">count    </th>

                     <th scope="col">shipping    </th>
                     <th scope="col">Remove    </th>

                </tr>
            </thead>
            {cart.map((p)=>
            <>
                <ProductCartInCheckOut
                key={p._id}
                p={p} />
            </>
            )}

        </table>
    )
    return (
        <div className="container-fluid pt-2">

            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length}</h4>

                    {!cart.length ? (<p>
                        NO product in Cart
                        <Link to="/shop">
                            continue shopping
                        </Link>
                    </p>) :
(showCartItems())                    }
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <br />
                    <p>
                        product
                    </p>
                    {cart.map((c, i) =>
                    (
                        <div key={i}>
                            <p>
                                {c.title}  x {c.count}=Rs.{c.price * c.count}
                            </p>
                        </div>
                    ))}
                    <br />
                    Total :<b>Rs{getTotal()}</b>
                    <br />
                    {
                        user ? (<button onClick={saveOrderToDb}
                            disbaled={!cart.length} className="btn btn-sm btn-primary mt-2">
                            Proceed to Checkout
                        </button>) : (
                                <button className="btn btn-sm btn-primary mt-2">
                                    <Link
                                    to={{
                                        pathname:"/login",
                                        state:{from:"cart"},
                                    }}>
                                        Login to Login
                                    </Link>
                                </button>
                            )
                    }
                </div>

            </div>

        </div>
    )
}

export default Cart;