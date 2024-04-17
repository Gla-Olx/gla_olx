import Category from '../components/Category'
import React, { useState } from 'react'
import styles from '../styles/Category.module.css'
import { IoIosArrowForward } from "react-icons/io"
import Card from '../components/Card'
import NoItem from '../components/NoItem'
import { useNavigate, Link, useLoaderData } from 'react-router-dom'


export const AllCategory = () => {
    const { category, items } = useLoaderData().data;
    const navigate = useNavigate();
    const [subCat, setSubCat] = useState("")
    const [showFilter, setShowFilter] = useState({})
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

    const handleSubCat = (ele) => {
        setSubCat(ele)
        let ite = items.filter((item) => {
            return item.subCategory.toLowerCase() === ele.toLowerCase()
        })
        if (!ite.length > 0 && ele !== "") {
            setShowFilter({ display: "grid", gridTemplateColumns: "1fr" })
        } else {
            setShowFilter({})
        }
    }

    const handleCategory = (ele) => {
        if (ele !== "") {
            setSubCat("")
            setShowFilter({})
            navigate(`/category/${ele}`)
        }
    }

    return (
        <>
            <Category handleCategory={handleCategory} />
            <section>
                <div className={styles.heading}>
                    <Link to={"/"}>Home</Link>
                    <h3>{category}</h3>
                </div>
                <div className={styles.container}>
                    <div className={styles.categorySection}>
                        <h5>Categories</h5>
                        <div>
                            <h4 onClick={() => { handleSubCat("") }}><IoIosArrowForward /> {category}</h4>
                            <ul>
                                {
                                    items && categories[category].map((item, i) => {
                                        return (
                                            <li key={i} onClick={() => { handleSubCat(item) }}>
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    {items.length > 0 ?
                        <div style={showFilter} className={styles.itemSection} id='itemSec'>
                            {items && items.map((item, i) => {
                                if (item.subCategory.toLowerCase().includes(subCat.toLowerCase())) {
                                    return (
                                        <Card item={item} key={i} />
                                    )
                                } else {
                                    return <NoItem key={i} />
                                }
                            })}
                        </div> :
                        <NoItem message={"No Items in this category"} />
                    }
                </div>
            </section>
        </>
    )
}

