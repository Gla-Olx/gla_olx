import React, { useEffect, useState } from 'react'
import styles from "../styles/card.module.css"
import { BsFillLightningChargeFill } from "react-icons/bs"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { Link } from 'react-router-dom'
// import Image from 'next/image'

const Card = ({ item }) => {
    const [hide, setHide] = useState(true)
    const [currentWishlist, setCurrentWishlist] = useState("")

    // const handleWishlist = async () => {
    //     let userId = localStorage.getItem("currentUserId")
    //     let product = {
    //         seller: item.seller,
    //         productId: item._id,
    //         title: item.title,
    //         price: item.price,
    //         images: item.images[4]
    //     }
    //     if (hide) {
    //         let res = await fetch("/api/wishlist", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ userId, productId: item._id, product })
    //         })
    //         let data = await res.json()
    //         if (data.success) {
    //             setHide(false)
    //         } else {
    //             alert("Item already in wishlist")
    //         }
    //     }
    //     else {
    //         let res = await fetch(`/api/wishlist?id=${currentWishlist}`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         let data = await res.json()
    //         if (data.success) {
    //             setHide(true)
    //         } else {
    //             alert("Item not in wishlist")
    //         }
    //     }
    // }

    // const checkWishlist = async () => {
    //     let userId = localStorage.getItem("currentUserId")
    //     let res = await fetch("/api/wishlist?userId=" + userId)
    //     let data = await res.json()
    //     if (data.success) {
    //         // setCurrentWishlist(data.data[0]._id)
    //         // setHide(false)
    //         console.log(data.wishlist)
    //     } else {
    //         console.log("first")
    //         // setHide(true)
    //     }
    // }
    return (
        <>
            {/* <div className="card-hover">
                <div className="card-hover__content">
                    <h3 className="card-hover__title">
                        Make your <span>choice</span> right now!
                    </h3>
                    <p className="card-hover__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam
                        doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?</p> */}
                    {/* <a href="#" className="card-hover__link">
                        <span>Learn How</span>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a> */}
                {/* </div>
                <img src={Array.isArray(item.images) ? item.images[4] : item.images} alt="img" className='cardImg'/>

            </div> */}
            <div className={styles.productBox}>
            {/* <span className={styles.wishlistBox}>
                    <AiOutlineHeart color='var(--secondary)' onClick={handleWishlist} style={{ display: !hide ? "none" : "block" }} size={20} /> <AiFillHeart onClick={handleWishlist} style={{ display: hide ? "none" : "block" }} size={20} color='var(--secondary)' />
                </span> */}
            {/* <div className={styles.ribbon} ><BsFillLightningChargeFill /> Trending</div> */}
            <div className={styles.productImg}>
                    <img src={Array.isArray(item.images) ? item.images[4] : item.images} alt="img" width={500} height={100} />
                </div>
                <Link to={`/product/${item._id ? item._id : item.productId}`} className={styles.productDetails}>
                    <div className={styles.productPrice}>
                        <span>₹ {item.price}</span>
                    </div>
                    <div  className={`latoFont ${styles.productTitle}`}> 
                        <div>
                            <h3>{
                                item.title.length > 28 ? item.title.substring(0, 28) + "..." : item.title
                            }</h3>
                        </div>
                    </div>
                    <div  className={`monsFont ${styles.productDesc}`}> 
                        <p>
                            {
                                item?.desc && item?.desc?.length > 50 ? item?.desc?.substring(0, 50) + "..." : item?.desc
                            }
                        </p>
                    </div>
                    <span className={styles.date}>
                        {item.createdAt && new Date(item.createdAt).toDateString().substring(3)}
                    </span>
                </Link>
            </div>

        </>
    )
}

export default Card