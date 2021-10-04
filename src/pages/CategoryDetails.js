import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useHistory } from "react-router-dom";
function CategoryDetails({ category }) {
	const [Products, setProducts] = useState([]);
const [SubCategories, setSubCategories] = useState([]);
	const history = useHistory();
	useEffect(() => {
		axios
			.get("/get_products", {
				params: {
					category: category,
				},
			})
			.then((res) => {
				console.log(res.data[0].products);
				setProducts(res.data[0].products);
				setSubCategories(res.data[0].subcategories)
			});
	}, []);

	return (
		<div className="CategoryDetails">
		<h1>{category}</h1>
		<h2>Sub Categories</h2>
			<ul className="subCategories">
				{SubCategories.map((SubCategory) => (
					<li key={Math.random()}>{SubCategory}</li>
				))}
			</ul>
			<h2>Products</h2>
			<ul>
				{Products.map((product) => (
					<li key={Math.random()}>{product}</li>
				))}
			</ul>
			
		</div>
	);
}

export default CategoryDetails;
