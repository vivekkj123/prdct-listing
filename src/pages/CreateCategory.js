import axios from "../axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

function CreateCategory() {
    const [Name, setName] = useState("");
    let history = useHistory();
    let createCategory = async (event) => {
        event.preventDefault()
        await axios.post("/create_category", { name: Name }).then(() => {
            history.push("/");
        });
        
    };
    return (
        <div className="CreateCategory">
            <h1>Add a New Category</h1>
            <form method="POST" onSubmit={createCategory}> 
                <label htmlFor="text">Category Name</label>
                <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateCategory;
