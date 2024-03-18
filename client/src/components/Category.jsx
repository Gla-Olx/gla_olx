import React, { useRef, useState } from 'react'
import styles from "../styles/Home.module.css"
import { IoIosArrowDropdownCircle, IoIosArrowForward } from "react-icons/io"
import {Link} from 'react-router-dom'

const Category = ({ handleCategory }) => {
    const [rotate, setRotate] = useState(false)
    const categories = {
        "Lab Items": ["Lab-Coats", "ED-lab Stuffs"],
        "Room Items": ["Posters", "Lights", "General Room Stuffs"],
        "Books": ["Course Books", "Novels", "Others"],
        "Sports Items": ["Cricket", "Badminton", "Volleyball", "Football", "Table Tennis", "Basketball"],
        "Gadgets": ["Mobiles", "Laptops", "Headphones", "Speakers", "Others"],
        "Accessories": ["Bags", "Watches", "Wallets", "Belts", "Sunglasses", "Others"],
        "Clothes": ["T-Shirts", "Shirts", "Jeans", "Jackets", "Others"],
        "Others": ["Others"],
    }
    const ref = useRef(null)

    return (
        <>
            <section>
                <ul className={styles.category}>
                    <li onClick={() => { ref.current.classList.toggle("hidden"); }} className={`${styles.dropDownParent} li`}><a>ALL CATEGORIES</a> <IoIosArrowDropdownCircle />
                        <div ref={ref} className={`${styles.dropDown} hidden`}>
                            {categories &&
                                Object.keys(categories).map((category, i) => {
                                    return (
                                        <div key={i}>
                                            <Link to={`/category/${category}`}>
                                                <h3 className='roboto1Font'>{category}</h3> 
                                            </Link>
                                            <div>
                                                {categories[category].map((item, index) => {
                                                    return (
                                                        <Link key={index} to={`/category/${category}`}>
                                                            <span className='robotoFont' key={index}>{item}</span>
                                                        </Link>
                                                    )
                                                })
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Lab Items</a></li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Room Items</a></li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Books</a></li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Sports Items</a></li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Gadgets</a></li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Accessories</a></li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Clothes</a></li>
                    <li className='li'><a onClick={(e) => { handleCategory(e.target.innerText) }}>Others</a></li>
                </ul>
            </section>
        </>
    )
}

export default Category