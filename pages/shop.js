import React, { useState, useEffect } from "react"
import { getProductByCount, fetchProductsByFliter } from "../function/product"
import { useSelector, useDispatch } from "react-redux"
import ProductCard from "../component/cards/ProductCard"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons"
import { Menu, Slider, Checkbox, Radio } from "antd"
import { getCategories, getCategorySubs } from "../function/category"
import { getsubs } from "../function/sub"

import Star from "../component/form/star"
const Shop = () => {
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)
    let { search } = useSelector((state) => ({ ...state }))
    const [price, setprice] = useState([0, 0]);
    const [category, setcategory] = useState([])
    const [categoryid, setcategoryid] = useState([]);
    const [sub, setsub] = useState([])
    const { text } = search;
    const [star, setstar] = useState('')
    const { SubMenu, ItemGroup } = Menu;
    const [subss, setsubss] = useState("")
    const [ok, setok] = useState(false);
    let dispatch = useDispatch();
    const [brands, setbrands] = useState(["puma","adidas","levis","roadster","pepeJeans"])
    const [brand, setbrand] = useState("")
    useEffect(() => {
        loadAllProducts()
        //fecting categories
        getCategories().then((res) => setcategory(res.data))
        getsubs().then((res) => setsub(res.data))
    }, [])
    //1-default
    const loadAllProducts = () => {
        getProductByCount(12).then((p) => {
            setproducts(p.data)
            setloading(false)
        })
    }
    //2-load product on user serach input 
    useEffect(() => {
        console.log("product", text)
        const delayed = setTimeout(() => {
            fetchProductsByFliter({ query: text })
                .then((res) => {
                    setproducts(res.data)
                    console.log("ssss", setproducts)
                    // if(!text )
                    // {
                    //     loadAllProducts();
                    // }
                }, 300)
            return () => clearTimeout(delayed)
        })

    }, [text]
    )

    //load product on price range


    useEffect(() => {
        console.log("ok to rqst");
        fetchProductsByFliter({ price })
            .then((res) => {
                setproducts(res.data)

            })
    }, [ok])

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setcategoryid([])
        setstar("")
        setsubss("")
        ShowBrand("")

        setprice(value);
        setTimeout(() => {
            setok(!ok);

        }, 300)
    }

    //categories
    const ShowCategories = () =>
        category.map((c) => (
            <div key={console._id}>
                <Checkbox onChange={handleCheck} className="pb-2 pl-4 pr-4 "
                    value={c._id}
                    name="category"
                    checked={categoryid.includes(c._id)}>
                    {c.name}
                </Checkbox>
            </div>))
    const handleCheck = e => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setprice([0, 0])
        setstar("")
        setsubss("")
        ShowBrand("")


        //console.log(e.target.value)
        let inTheState = [...categoryid]
        let justchecked = e.target.value;
        let foundinthestate = inTheState.indexOf(justchecked)

        if (foundinthestate === -1) {
            inTheState.push(justchecked)
        }
        else {
            //
            inTheState.splice(foundinthestate, 1)
        }
        //
        setcategoryid(inTheState)
        console.log(inTheState);
        fetchProductsByFliter({ category: inTheState })
            .then((res) => {
                setproducts(res.data)

            })
    };

    ///star

    const handleStarClick = (num) => {
        console.log(num)
        console.log("hi")
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setprice([0, 0])
        setcategoryid([])
        setstar(num)
        setsubss("")
        ShowBrand("")

        fetchProductsByFliter({ star: num })
            .then((res) => {
                setproducts(res.data)

            })
    }


    const showstars = () =>
    (
        <div className="pr-4 pl-4 pb-2">
            <Star StarClick={handleStarClick} numberOfStars={5} />
            <Star StarClick={handleStarClick} numberOfStars={4} />
            <Star StarClick={handleStarClick} numberOfStars={3} />
            <Star StarClick={handleStarClick} numberOfStars={2} />
            <Star StarClick={handleStarClick} numberOfStars={1} />

        </div>
    )

    //5
    const ShowSubs = () =>
        sub.map((s) =>
            <div onClick={() => handleSub(s)
            }
                className="p-1 m-1 badge badge-secondary"
                key={s._id}
                style={{ cursor: "pointer" }}
            >
                {s.name}
            </div>
        )
    const handleSub = (subss) => {
        console.log("SUB", subss)
        setsubss(subss)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setprice([0, 0])
        setcategoryid([])
        ShowBrand("")

        setstar('')
        fetchProductsByFliter({ subss })
            .then((res) => {
                setproducts(res.data)

            })
    }
    const ShowBrand = () => 
        brands.map((b) => (<Radio 
            value={b}
            name={b}
            checked={b === brand}
            onChange={handleBrand}
            className="pb-1 pl-1 pr-5"
        >
            {b}
          
        </Radio>))
    
    const handleBrand = (e) => {
        setsubss('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setprice([0, 0])
        setcategoryid([])
        setstar('')
        setbrand(e.target.value);
        fetchProductsByFliter({ brand: e.target.value })
            .then((res) => {
                setproducts(res.data)

            })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>search/filter menu </h4>
                    <Menu defaultOpenKeys={["1", "2", "3", '4', '5']} mode="inline">
                        <SubMenu key="1" title={
                            <span className="h6">
                                <DollarOutlined /> Price
                    </span>}>
                            <div>
                                <Slider
                                    className="ml4 mr-4"
                                    tipFormatter={(v) => `Rs${v}`}
                                    range value={price}
                                    onChange={handleSlider}
                                    max="100000" />
                            </div>
                        </SubMenu>

                        <SubMenu key="2" title={
                            <span className="h6">
                                <DownSquareOutlined /> Category
                    </span>}>
                            <div style={{ marginTop: "-10px" }}>
                                {ShowCategories()}                       </div>
                        </SubMenu>
                        {/*star*/}
                        <SubMenu key="3" title={
                            <span className="h6">
                                <StarOutlined /> Rating
                    </span>}>
                            <div style={{ marginTop: "-10px" }}>
                                {showstars()}                       </div>
                        </SubMenu>

                        <SubMenu key="4" title={
                            <span className="h6">
                                <DownSquareOutlined />subs Category
                    </span>}>
                            <div style={{ marginTop: "-10px" }}>
                                {ShowSubs()}                       </div>
                        </SubMenu>
                        <SubMenu key="5" title={
                            <span className="pr-5">
                                <DownSquareOutlined />Brand
                    </span>}>
                            <div style={{ marginTop: "-10px" }}>
                                {ShowBrand()}                       </div>
                        </SubMenu>
                    </Menu>
                </div>

                <div className="col-md-9 pt-2">
                    {loading ?
                        (
                            <h4 className="text-danger">Loading...</h4>
                        ) :
                        (
                            <h4 className="text-danger">Products</h4>
                        )}
                    {products.length < 1 && <p>No products found</p>}
                    <div className="row pb-5">
                        {products.map((p) =>
                        (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Shop