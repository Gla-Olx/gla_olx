import React from 'react'
import styles from "../styles/Home.module.css"
import { IoIosArrowDropdownCircle, IoIosArrowForward } from "react-icons/io"
import { Link } from 'react-router-dom'
import glxContext from '../context/glxContext'
const Category = ({ handleCategory, removeAllFilters }) => {


    const showAllCategory = () => {
        removeAllFilters();
    }

    return (
        <>
            <section>
                <ul className={styles.category}>
                    <li onClick={showAllCategory} className={`${styles.dropDownParent} li`}><a>ALL CATEGORIES</a>
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