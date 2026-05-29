import React,{useState} from "react"
import laptop from "../../images/laptop.png"
import { Card, Tabs,Tooltip } from "antd";
import { Link } from "react-router-dom"
import { HeartOutlined } from "@ant-design/icons"
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ProductListItems from "./ProductListItems"
import StarRating from "react-star-ratings"
import RatingModal from "../../component/modal/RatingModal"
import { ShowAverage } from "../../function/Rating"
import _ from "lodash"
import {useDispatch} from "react-redux"
const { TabPane } = Tabs
const SingleProduct = ({ product, onStarClick, star }) => {
    const {
        title, description, images, _id
    } = product

    const [tooltip,settooltip]=useState("Click to Add")
const dispatch =useDispatch()
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

    return (

        <>

            <div className="col-md-7">

                {images && images.length ? <Carousel showArrows={true} autoplay infiniteLoop>
                    {images && images.map((i) =>

                        <img src={i.url} key={i.public_id} alt={title} />
                    )}
                </Carousel>
                    : (<Card
                        cover={
                            <img src={laptop}
                                className="mb-3 card-image"
                                alt="laptop"
                            ></img>
                        }
                    ></Card>)}

                <Tabs type="card">
                    <TabPane tab="description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="more" key="2">
                        Call me at 0000000000 fro more detail                            </TabPane>
                </Tabs>



            </div>

            <div className="col-md-5">
                <h1 className="big-info -3 bg-info">
                    {title}
                </h1>
                {product && product.ratings && product.ratings.length > 0 ?
                    ShowAverage(product)
                    : <div className="text-center pt-1 pb-3">
                        No Rating Yet</div>
                }

                <Card actions={[
                    <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /><br/>Add to cart
                </a>
                </Tooltip>,

                    <Link to="/">
                        <HeartOutlined
                            className="text-info"
                        />
                        <br />
                          Add to Wishlist

                    </Link>,
                    <RatingModal>
                        <StarRating
                            name={_id}
                            numberOfStars={5}
                            rating={star}
                            // changeRating={(newRating,name)=>
                            // console.log(newRating,name)}
                            changeRating={onStarClick}
                            isSelectable={true}
                            starRatedColor="red"
                        />
                    </RatingModal>,

                ]}>
                    <ProductListItems product={product} />

                </Card>
            </div>
        </>

    )
}
export default SingleProduct;