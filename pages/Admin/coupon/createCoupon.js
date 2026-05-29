import React, { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import { getCoupons, removeCoupon, createCoupon } from "../../../function/coupon"
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../component/nav/adminNav";
import {Prompt} from "react-router"


import { DeleteOutlined } from "@ant-design/icons"

const formIsHalfFilledOut=()=>
{
//
}

const CreateCouponPage = () => {
    const [name, setname] = useState('')
    const [expiry, setexpiry] = useState('')
    const [discount, setdiscount] = useState('')
    const [loading, setloading] = useState('')
    const [coupons, setcoupons] = useState([])
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        getCoupons().then(res => setcoupons(res.data))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
setloading(true)
        createCoupon({ name, expiry, discount }, user.token)
            .then(res => {
                setloading(false)
                getCoupons().then((res)=>setcoupons(res.data));

                setname("")
                setdiscount("")
                setexpiry("")
                toast.success(`coupon is created`)

            })
            .catch((err) =>
                console.log("create coupon err", err)
            )
    }
    const handleRemove=(couponId)=>
    {
if(window.confirm("delete?"))
{
    setloading(true)
    removeCoupon(couponId,user.token)
    .then((res)=>
    {
        getCoupons().then((res)=>setcoupons(res.data));
        setloading(false)
        toast.error(`coupon deleted`)
    })
    .catch(err=>
    console.log(err))
}
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? <h4 className="text-danger">Loading</h4> :
                        <h4>Coupon</h4>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setname(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />

                        </div>

                        <div className="form-group">
                            <label className="text-muted">
                                Discount
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setdiscount(e.target.value)}
                                value={discount}

                                required
                            />

                        </div>

                        <div className="form-group">
                            <label className="text-muted">
                                Expiry
                            </label>
                            <br />
                            <DatePicker
                                className="form-control"
                                selected={new Date()}
                                value={expiry}
                                onChange={(date) => setexpiry(date)}
                                required
                            />

                        </div>
                        <button className="btn btn-outline-primary">
                            Save
                        </button>
                    </form>

                    <br />
                    <h4>{coupons.length} Coupon</h4>

                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((c)=>
                            (
                                <tr key={c._id}>
                                    <td>
                                        {c.name}
                                    </td>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>{c.discount}</td>
                                    <td>
                                        <DeleteOutlined onClick={()=> handleRemove(c._id)} className="text-danger pointer"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
                </div>
            </div>
        </div>

    )
}
export default CreateCouponPage;