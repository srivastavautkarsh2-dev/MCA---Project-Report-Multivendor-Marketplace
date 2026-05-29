import React from "react";

import { Select } from "antd";
import {Prompt} from "react-router"


const { Option } = Select;
const ProductUpdateForm = ({ handleSubmit, handleChange, setvalues, values, handleCategoryChange, categories, subOptions ,arrayofSubsIds,setArrayofSubsIds,selectedCategory}) => {
    const { title,
        description,
        price, 
        category,
        subs,
        shipping,
        quantity,
        images,
        color,
        colors,
        brand,
        brands } = values;


        const formIsHalfFilledOut=()=>
{
//
}


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}

                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}

                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}

                />
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}

                />
            </div>


            <div className="form-group">
                <label>Shipping</label>
                <select
                    value={shipping === "yes" ? "yes" : "no"}
                    type="text"
                    name="shipping"
                    className="form-control"

                    onChange={handleChange}

                >

                    <option value="no">
                        NO
            </option>
                    <option value="yes">
                        yes
            </option>
                </select>
            </div>

            <div className="form-group">
                <label>colors</label>
                <select
                    value={color}
                    type="text"
                    name="color"
                    className="form-control"

                    onChange={handleChange}

                >

                    {colors.map(c =>
                        <option key={c} value={c}>
                            {c}
                        </option>)}
                </select>
            </div>
            <div className="form-group">
                <label>brands</label>
                <select
                    value={brand}
                    type="text"
                    name="brand"
                    className="form-control"

                    onChange={handleChange}

                >

                    {brands.map(b =>
                        <option key={b} value={b}>
                            {b}
                        </option>)}
                </select>
            </div>
            <div className="form-group">
                <label>
                    category
                            </label>
                <select className="form-control" name="category"
                    onChange={handleCategoryChange}
                    value={selectedCategory?selectedCategory: category._id}>
                    {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>
                        {c.name}</option>))}
                </select>
            </div>

            <div><label>
                Sub category
    </label>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="please slect"
                    value={arrayofSubsIds}

                    onChange={(value) =>setArrayofSubsIds(value)}
                >{console.log(values)}
                    {subOptions.length && subOptions.map((s) =>
                        <Option key={s._id} value={s._id}>{s.name}</Option>)}

                </Select>
            </div>


            <br />
            <button className="btn btn-outline-info">Save</button>
            <Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>

        </form>
    )
}

export default ProductUpdateForm;