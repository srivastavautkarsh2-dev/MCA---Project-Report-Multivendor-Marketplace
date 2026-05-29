import React from "react"
import {Link } from "react-router-dom"

const ProductListItems=({product})=>
{
    const {price,category,subs,shipping,color,brand,quantity,sold}=product;
    return(<>

    <li className="list-group-item">
        Price<span className="label label-defalt label-pill pull-xs-right">
{price}
        </span>

    </li>


{category &&
    <li className="list-group-item">
        Category{""}
        <Link to={`/category/${category.slug}`} className="label label-defalt label-pill pull-xs-right">
{category.name}
        </Link>

    </li>
}

{subs && (
        <li className="list-group-item">
            Sub Categories
            {subs.map((s)=>
            <Link key={s._id} to={`/sub/${s.slug}`} className="label label-defalt label-pill pull-xs-right">
            {s.name}
                    </Link>
            )}
</li>
)}

    

    <li className="list-group-item">
        Shipping{" "}<span className="label label-defalt label-pill pull-xs-right">
{shipping}
        </span>

    </li>


    <li className="list-group-item">
        color{" "}<span className="label label-defalt label-pill pull-xs-right">
{color}
        </span>

    </li>

    <li className="list-group-item">
        brand{" "}<span className="label label-defalt label-pill pull-xs-right">
{brand}
        </span>

    </li>

    <li className="list-group-item">
        Available{" "}<span className="label label-defalt label-pill pull-xs-right">
{quantity}
        </span>
</li>
    
<li className="list-group-item">
        sold{" "}<span className="label label-defalt label-pill pull-xs-right">
{sold}
        </span>
</li>
</>

    )
}
export default ProductListItems