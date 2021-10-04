import axios from '../axios'
import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import {Link} from 'react-router-dom'
function Home() {
    const [categories, setcategories] = useState([])
    useEffect(() => {
        axios.get("/Categories").then((res)=>{
            console.log(res.data);
            setcategories(res.data)
        })
    }, [])

    return (
        <div className="Home">
            <Link to='/create_category'>
            <button>
                Create a New Category
            </button>
            </Link>
            <Categories categories={categories}/>
        </div>
    )
}

export default Home
