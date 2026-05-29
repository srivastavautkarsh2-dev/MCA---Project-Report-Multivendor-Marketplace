/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { Card ,Tooltip} from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import laptop  from "../../images/laptop.png"
import { Link } from "react-router-dom";
import { ShowAverage } from "../../function/Rating"
import _ from "lodash"
import {useSelector,useDispatch} from "react-redux"

const ProductCard = ({ product }) => {
    const [tooltip,settooltip]=useState("Click to Add")
const dispatch =useDispatch()
const {user,cart}=useSelector((state)=>({...state}))
const handleAddToCart=()=>
{
    //array cart
    let cart =[];
    if(typeof window !== 'undefined')
    {
        //localstorage get it
        if(localStorage.getItem('cart'))
        {
            cart =JSON.parse(localStorage.getItem("cart"))
        }
        //push new product to cart
        cart.push({
            ...product,
            count:1
        });
        //remove dublicates
        let unique=_.uniqWith(cart,_.isEqual)
        //save to local storage
        console.log("uniques",unique)
        localStorage.setItem("cart",JSON.stringify(unique))

        //tooltip
        settooltip("added");

        ///add to redux state

        dispatch({
            type:"ADD_TO_CART",
            payload:unique,

        })

        dispatch({
            type:"SET_VISIBLE",
            payload:true,

        })
    }
}

const {Meta}=Card;
    const {images,title,description,slug,price}=product;
    return (<>
    {product && product.ratings && product.ratings.length > 0 ?
                    ShowAverage(product)
                    : <div className="text-center pt-1 pb-3">
                        No Rating Yet</div>
                }
        <Card cover={
            <img src={images && images.length ? images[0].url : laptop}
                style={{ height: "150px", objectFit: "cover" }}
                className="p-1"
                alt={title}
            />
        }
            actions={[
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-warning" /><br/>view Product


                </Link>,
                <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /><br/>Add to cart
                </a>
                </Tooltip>
            ]}
        >
            <Meta
                title={`${title}-Rs${price}`}
                description={`${description && description.substring(0, 40)}...`}
            />

        </Card></>
    )
}

export default ProductCard;