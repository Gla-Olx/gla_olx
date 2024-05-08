import React, { useEffect, useState, useContext } from 'react'
import styles from "../styles/singleProduct.module.css"
import { AiOutlineShareAlt, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { TbListDetails, TbEyeCheck } from "react-icons/tb"
import { FaRegHandshake } from "react-icons/fa"
import { IoIosArrowForward } from "react-icons/io"
import Card from '../components/Card'
import {Link, useLoaderData, useNavigate} from 'react-router-dom'
import ChatWithSeller from '../components/ChatWithSeller'
import glxContext from '../context/glxContext'


export const Product = () => {
    const { product_details: item, similar_products:similarItems } = useLoaderData();    
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()
    const [diff, setDiff] = useState("")
    const [currentWishlist, setCurrentWishlist] = useState("")
    const [showSafetyTips, setShowSafetyTips] = useState(false)
    const [chatData, setChatData] = useState({ currentUser: "", seller: "", item: "", itemPrice: "" })
    const context = useContext(glxContext)
    const { showAlert, setMessage } = context
    const host = "http://localhost:8000"

    useEffect(() => {
        checkWishlist();
        setCurrentUser(localStorage.getItem("currentUserId"));
        checkView();
        let today = new Date()
        let createdAt = new Date(item.created_date)
        let diff = today - createdAt
        let mins = Math.floor(diff / (1000 * 60))
        let hours = Math.floor(diff / (1000 * 60 * 60))
        let days = Math.floor(hours / 24)
        if (days < 1) {
            if (hours < 1) {
                setDiff(`${mins} mins ago`)
            } else {
                setDiff(`${hours} hours ago`)
            }
        } else {
            setDiff(`${days} days ago`)
        }

    }, [])
    const [hide, setHide] = useState(true)
    let images = [item.proimg1, item.proimg2, item.proimg3, item.proimg4, item.proimg5]
    const [mainSlider, setMainSlider] = useState(images[4])

    const handleSeller = (seller) => {
        let currentUser = localStorage.getItem("currentUserId")
        setShowSafetyTips(true)
        setChatData({ currentUser, seller, item: item.product_title, itemPrice: item.product_price })
    }
    const checkView = async () => {
        let viewed = localStorage.getItem("viewed")
        if (viewed) {
            if (viewed.includes(item.product_id)) {
                return
            }
            viewed = JSON.parse(viewed)
            viewed.push(item.product_id)
            localStorage.setItem("viewed", JSON.stringify(viewed))
            const res = await fetch(host+"/api/view", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ item: item._id })
            })
            const data = await res.json()

        } else {
            localStorage.setItem("viewed", JSON.stringify([item.product_id]))
            const res = await fetch(host+"/api/view", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ item: item.product_id })
            })
            const data = await res.json()
        }
    }


    const handleSlider = (e) => {
        let direct = e.target.getAttribute("direct")
        if (direct === "left") {
            let index = images.indexOf(mainSlider)
            if (index === 0) {
                setMainSlider(images[images.length - 1])
            } else {
                setMainSlider(images[index - 1])
            }
        } else {
            let index = images.indexOf(mainSlider)
            if (index === images.length - 1) {
                setMainSlider(images[0])
            } else {
                setMainSlider(images[index + 1])
            }
        }
    }

    const copyLink = () => {
        let link = window.location.href
        navigator.clipboard.writeText(link)
        setMessage("Link Copied")
        showAlert()
    }

    const handleWishlist = async () => {
        let userId = localStorage.getItem("currentUserId")
        let product = {
            seller: item.seller_id,
            productId: item.product_id,
            title: item.product_title,
            price: item.product_price,
            images: item.images[4]
        }
        if (hide) {
            let res = await fetch(host+"/api/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, productId: item._id, product })
            })
            let data = await res.json()
            if (data.success) {
                setHide(false)
            } else {
                alert("Item already in wishlist")
            }
        }
        else {
            let res = await fetch(`${host}/api/wishlist?id=${currentWishlist}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let data = await res.json()
            if (data.success) {
                setHide(true)
            } else {
                alert("Item not in wishlist")
            }
        }
    }

    const checkWishlist = async () => {
        let userId = localStorage.getItem("currentUserId")
        let productId = item._id
        let res = await fetch(host+"/api/wishlist?userId=" + userId + "&productId=" + productId)
        let data = await res.json()
        if (data.success) {
            setCurrentWishlist(data.data[0]._id)
            setHide(false)
        } else {
            setHide(true)
        }
    }

    const handleUserProfile = () => {
        navigate(`/profile?userProfile=${item.seller_id}`)
    }


    return (
        <>
           
            <div className={styles.container}>
                {
                    showSafetyTips &&
                    <ChatWithSeller chatData={chatData} />
                }
                <ul>
                    <li>
                        <Link to={"/"}>
                            <span>Home <IoIosArrowForward size={15} color='#20494E' /> </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/category/${item.product_category}`}>
                            <span>{item.product_category} <IoIosArrowForward size={15} color='#20494E' /></span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/category/${item.product_category}#${item.product_subcategory}`}>
                            <span>{item.product_subcategory} <IoIosArrowForward size={15} color='#20494E' /></span>
                        </Link>
                    </li>
                    <li>
                        <span>{item.title}</span>
                    </li>
                </ul>
            </div>

            <div className={`aliceFont ${styles.box}`} >
                <div className={styles.innerBox}>
                    <div className={styles.sliderBox}>
                        <div className={styles.sliderElement}>
                            <img width={500} height={100} src={mainSlider} alt="img" />
                        </div>
                        <img alt='img' width={100} height={100} src='/images/arr.png' className={styles.left} direct="left" onClick={handleSlider} />
                        <img alt='img' width={100} height={100} src='/images/arr.png' className={styles.right} direct="right" onClick={handleSlider} />
                    </div>
                    <div className={styles.imgBox}>
                        <img width={500} height={100} src={images[0]} alt={images[0]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img width={500} height={100} src={images[1]} alt={images[1]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img width={500} height={100} src={images[2]} alt={images[2]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img width={500} height={100} src={images[3]} alt={images[3]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                    </div>
                    <div className={styles.itemBox}>
                        <div className={styles.item1}>
                            <div className={styles.price}>
                                <span className='notoFont'>₹{item.product_price}</span>
                                <span> <AiOutlineShareAlt onClick={copyLink} size={30} />
                                    {
                                        currentUser === item.seller ? null : <>
                                            <AiOutlineHeart onClick={handleWishlist} style={{ display: !hide ? "none" : "block" }} size={30} /> <AiFillHeart onClick={handleWishlist} style={{ display: hide ? "none" : "block" }} size={30} color='red' />
                                        </>
                                    }
                                </span>
                            </div>
                            <div  className={`notoFont ${styles.title}`}>
                                Product: {item.product_title}
                            </div>
                            <div className='notoFont'>
                                Added: {diff}
                            </div>
                        </div>
                        <div className={styles.item2}>
                            <div className={styles.profile}>
                                <div>
                                    <img width={100} height={100} src={item.seller_picture} alt="img" />
                                </div>
                                <div className='notoFont' onClick={handleUserProfile}>
                                    {item.seller_name} <IoIosArrowForward color='#BBBEBF' size={25} />
                                </div>
                            </div>
                            {
                                currentUser === item.seller ? null :
                                    <button onClick={() => { handleSeller(item.seller_id) }} className={`notoFont ${styles.buttonChat}`}>
                                        Chat with seller
                                    </button>
                            }
                        </div>
                        <div className={`notoFont ${styles.item3}`}>
                            <div>
                                <TbListDetails color='#949B9D' size={30} />
                                <span>Get all details</span>
                            </div>
                            <div>
                                <TbEyeCheck color='#949B9D' size={30} />
                                <span>See What You Buy</span>
                            </div>
                            <div>
                                <FaRegHandshake color='#949B9D' size={30} />
                                <span>Negotiate with seller</span>
                            </div>
                        </div>
                    </div>

                    <div className={`popFont ${styles.detailsBox}`}>
                        <div className={styles.details}>
                            <h4>Product Details:</h4>
                            <div className={styles.productInfo}>
                                <div>
                                    <span>Type</span>
                                    <span>Category</span>
                                </div>
                                <div>
                                    <span>{item.product_category}</span>
                                    <span>{item.product_subcategory}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <h4>Description:</h4>
                            <p>
                                {item.product_desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                similarItems.length > 0 &&
                <div className={styles.similarItemsBox}>
                    <div className={styles.similarItems}>
                        <h4>People also look for:</h4>
                        <div className={styles.products}>
                            {
                                similarItems.map((item) => {
                                    return (
                                        <Card key={item.product_id} item={item} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
