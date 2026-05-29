import axios from "axios"
//import React from "react"
//import axios from "axios"

export const userCart= async (cart,authtoken)=>
await axios.post(`http://localhost:8081/api/user/cart`,{cart},
{
    headers:{
        authtoken,
    }
})

export const getUserCart= async (authtoken)=>
await axios.get(`http://localhost:8081/api/user/cart`,
{
    headers:{
        authtoken,
    }
})

export const emptyUserCart= async (authtoken)=>
await axios.put(`http://localhost:8081/api/user/cart`,
{},
{
    headers:{
        authtoken,
    }
})

export const saveAddressuser= async (authtoken,address)=>
await axios.post(`http://localhost:8081/api/user/address`,
{address},
{
    headers:{
        authtoken,
    }
})

export const applyCoupon=async(authtoken,coupon)=>
{
    
    await axios.post(`http://localhost:8081/api/user/cart/coupon`,
    {coupon},{
headers:
{
    authtoken,
}
    })
}