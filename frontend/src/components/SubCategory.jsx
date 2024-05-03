import { useEffect, useRef, useState } from "react"
import styles from "../styles/navbar.module.css"

const categories = {
    "Lab Items": ["Lab-Coats", "ED-lab Stuffs"],
    "Room Items": ["Posters", "Lights", "General Room Stuffs", "Electronics"],
    "Books": ["Course Books", "Novels", "Others"],
    "Sports Items": ["Cricket", "Badminton", "Volleyball", "Table Tennis", "Football", "Basketball"],
    "Gadgets": ["Mobiles", "Laptops", "Headphones", "Speakers", "Others"],
    "Accessories": ["Bags", "Watches", "Wallets", "Belts", "Sunglasses", "Others"],
    "Clothes": ["T-Shirts", "Shirts", "Jeans", "Jackets", "Others"],
}

const categoriesImg = {
    "Lab Items": "images/lab-items.jpg",
    "Room Items": "images/room-items.jpg",
    "Books": "images/books.jpg",
    "Sports Items": "images/sports-items.jpg",
    "Gadgets": "images/gadgets.jpg",
    "Accessories": "images/accessories.jpg",
    "Clothes": "images/clothes.jpg",
}

const SubCategory = ({ show, subMenuCategory }) => {
    const ref = useRef(null);
    useEffect(() => {
        let childEle = ref.current.children.length;
        if (childEle > 3) {
            ref.current.style.width = "50%";
            ref.current.style.flexWrap = "wrap";
            ref.current.style.flexDirection = "row";
        } else {
            ref.current.style.width = "100%";
            ref.current.style.flexWrap = "nowrap";
            ref.current.style.flexDirection = "column";
        }


    }, [subMenuCategory])



    return (
        <>
            <div className={styles.container} style={show ? { display: "block" } : { display: "none" }}>
                <div className={styles.box}>
                    <div className={styles.subCategory}>
                        <h2>{subMenuCategory}</h2>
                        <ul ref={ref}>
                            {
                                subMenuCategory && categories[subMenuCategory].map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                            {
                                
                                subMenuCategory && <img src={categoriesImg[subMenuCategory]} alt={subMenuCategory} />
                            }
                </div>
            </div>
        </>
    )
}

export default SubCategory