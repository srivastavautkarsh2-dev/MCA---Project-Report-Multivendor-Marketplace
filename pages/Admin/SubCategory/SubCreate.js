import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../component/nav/adminNav";
import { useSelector } from "react-redux";
import {
    createsub,
    removesub, getsub  ,getsubs
} from "../../../function/sub"
import {getCategories} from "../../../function/category"
import CategoryForm from "../../../component/form/CategoryFrom";
import { Link } from "react-router-dom"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import LocalSearch from "../../../component/form/LocalSearch"
import {Prompt} from "react-router"

const SubCreate = () => {
    const formIsHalfFilledOut=()=>
    {
    //
    }
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setloading] = useState(false);
    const [categories, setcategoris] = useState([]);
    const [category ,setcategory]=useState("");
    //search\
    const [keyword, setkeyword] = useState("")
    const [subs,setsubs]=useState([])
    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () =>
    getCategories().then((c) =>
            setcategoris(c.data));

            const loadSubs = () =>
            getsubs().then((s) =>
                    setsubs(s.data));


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setloading(true)
        createsub({ name ,parent:category}, user.token)
            .then((res) => {
                setloading(false)
                setName("")
                toast.success(`"${res.data.name}" is created`)
                loadSubs();
            })
            .catch((err) => {
                console.log(err)
                setloading(false)
                if (err.response.status === 400) toast.error(err.response.data);
                

            }
            )
    }


    const handleRemove = async (slug) => {
        let answer = window.confirm("Are you sure Bro?")
        if (answer === true) {
            setloading(true)
            removesub(slug, user.token)
                .then(
                    (res) => {
                        setloading(false);
                        toast.error(`${res.data.name} deleted`)
                        loadSubs();

                    }
                )
                .catch((err) => {
                    if (err.response.status === 400) {
                        setloading(false)
                        toast.error(err.response.data)
                    }
                })
        }
    }



    //

    const searched = (keyword) => (c) =>
        c.name.toLowerCase().includes(keyword)



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading....</h4>) :
                        <h4>Create Sub Category</h4>}

                        <div className="form-group">
                            <label>
                               Parent category
                            </label>
                            <select className="form-control" name="category"
                            onChange={(e)=>
                            setcategory(e.target.value)}>
                                <option>Please select</option>
               {categories.length>0 && categories.map((c)=>(<option key={c._id} value={c._id}>
                   {c.name}</option>))}
                            </select>
                        </div>
                    <CategoryForm handleSubmit={handleSubmit}
                        name={name}
                        setName={
                            setName
                        }
                    />

                    <LocalSearch keyword={keyword} setkeyword={setkeyword} />


                    <hr />

                    {subs.filter(searched(keyword)).map((s) =>
                    (
                        <div className="alert alert-secondary" key={s.id}>
                            
                            {s.name}
                            <span onClick={() => handleRemove(s.slug)}
                                className="btn btn-sm float-right">
                                <DeleteOutlined className="text-danger" /></span>{""}
                            <Link to={`/admin/sub/${s.slug}`}><span className="btn btn-sm float-right"><EditOutlined className="text-warning" /></span></Link>
                        </div>
                    ))}
                                           <Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
                </div>
            </div>
        </div>
    )
}
export default SubCreate;