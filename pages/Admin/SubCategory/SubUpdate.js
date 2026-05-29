import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../component/nav/adminNav";
import { useSelector } from "react-redux";
import {
    getsub
    ,updatesub
} from "../../../function/sub"
import {getCategories} from "../../../function/category"
import CategoryForm from "../../../component/form/CategoryFrom";
const SubUpdate = ({history,match}) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setloading] = useState(false);
    const [categories, setcategoris] = useState([]);
    //search\
    const [parent ,setparent]=useState("");
    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () =>
    getCategories().then((c) =>
            setcategoris(c.data));

            const loadSubs = () =>
            getsub(match.params.slug).then((s) =>{
                    setName(s.data.name)
                    setparent(s.data.parent)})




    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setloading(true)
        updatesub(match.params.slug,{ name ,parent}, user.token)
            .then((res) => {
                setloading(false)
                setName("")
                toast.success(`"${res.data.name}" is updated`)
                history.push("/admin/sub")
            })
            .catch((err) => {
                console.log(err)
                setloading(false)
                if (err.response.status === 400) toast.error(err.response.data);
                

            }
            )
    }




    //

    // const searched = (keyword) => (c) =>
    //     c.name.toLowerCase().includes(keyword)



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading....</h4>) :
                        <h4>Update Sub Category</h4>}

                        <div className="form-group">
                            <label>
                               Parent category
                            </label>
                            <select className="form-control" name="category"xw
                            onChange={(e)=>
                            setparent(e.target.value)}>
                                <option>Please select</option>
               {categories.length>0 && categories.map((c)=>(<option key={c._id} value={c._id}
               selected={c._id === parent}>
                   {c.name}</option>))}
                            </select>
                        </div>
                    <CategoryForm handleSubmit={handleSubmit}
                        name={name}
                        setName={
                            setName
                        }
                    />



                    <hr />

                 
                </div>
            </div>
        </div>
    )
}
export default SubUpdate;