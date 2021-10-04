import React from 'react'
import './Categories.css'
import {Link} from 'react-router-dom'
function Categories({categories}) {
    return (
        <div className="Categories">

            <ul> {
                categories.map((category) => (
                        <Link to={`/category/${category.name}`}>
                    <li key={category._id}> {category.name} </li>

                        </Link>
                ))
            } </ul>
        </div>
    )
}

export default Categories
