import React, { useEffect, useState } from "react";
import axios from '../axios'
import {useHistory} from 'react-router-dom'
function Addproduct() {
	 const [categories, setcategories] = useState([])
	 const [Category, setCategory] = useState('')
	 const [Name, setName] = useState('')
	 let history = useHistory()

    useEffect(() => {
        axios.get("/Categories").then((res)=>{
            console.log(res.data);
            setcategories(res.data)
        })
    }, [])
    let AddProduct = async(event) =>{
    	event.preventDefault()
    	await axios.post("/add_product", { name: Name, category:  Category}).then(() => {
            history.push("/");
        });
    }
	return (
		<div>
			<h1>Add a New Product</h1>
			<form onSubmit={AddProduct}>
				Product Name:
				<input type="text" value={Name} onChange={(e)=> setName(e.target.value)}/><br/><br/>
				Category:
				<select id="cars" name="cars" selected={Category} onChange={(e)=>setCategory(e.target.value)}>
				<option value=""></option>

				{categories.map((cgry)=>(
					<option value={cgry.name}>{cgry.name}</option>

					))}
				</select>
				<button type="submit">Add The Product</button>
			</form>
		</div>
	);
}

export default Addproduct;
