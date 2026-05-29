import React from "react";

import {Select } from "antd";
import {Prompt} from "react-router"

const {Option}=Select;
const ProductCreateForm = ({ handleSubmit, handleChange, setvalues,values, handleCategoryChange,
    subOptions, showSub }) => {
    const { title,
        description,
        price,
        categories,
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
                    type="text"
                    name="shipping"
                    className="form-control"

                    onChange={handleChange}

                >
                    <option>
                        Please select
            </option>
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
                    type="text"
                    name="color"
                    className="form-control"

                    onChange={handleChange}

                >
                    <option >
                        Please select
            </option>
                    {colors.map(c =>
                        <option key={c} value={c}>
                            {c}
                        </option>)}
                </select>
            </div>
            <div className="form-group">
                <label>brands</label>
                <select
                    type="text"
                    name="brand"
                    className="form-control"

                    onChange={handleChange}

                >
                    <option >
                        Please select
            </option>
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
                    onChange={handleCategoryChange}>
                    <option>Please select</option>
                    {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>
                        {c.name}</option>))}
                </select>
            </div>

<div>
    {showSub && <div>
        <label>
        Sub category
    </label>
    <Select
    mode ="multiple"
    style={{width:"100%"}}
    placeholder="please slect"
    value={subs}

    onChange={(value)=>
        setvalues({...values,subs:value})}
    >{subOptions.length && subOptions.map((s)=>
    <Option key={s._id} value={s._id}>{s.name}</Option>)}

    </Select>
    </div>}
</div>
<br/>
            <button className="btn btn-outline-info">Save</button>

            <Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>

        </form>
    )
}

export default ProductCreateForm;