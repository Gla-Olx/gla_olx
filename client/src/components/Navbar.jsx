import React, { useEffect, useState, useRef } from 'react'
import styles from "../styles/navbar.module.css"
import { Link, Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AiOutlinePlusCircle, AiOutlineHeart } from 'react-icons/ai'
import { BiHelpCircle, BiSpreadsheet } from 'react-icons/bi'
import { BsChatDots } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { signOut } from "firebase/auth";
import { auth } from "../middleware/firebase"


const Navbar = () => {
    const ref = useRef();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState()
    const [nav, setNav] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [profilePic, setProfilePic] = useState("/images/user.png")
    const [displayName, setDisplayName] = useState("")
    let path = useLocation().pathname;

    useEffect(() => {
        let userId = localStorage.getItem("currentUserId")
        let profilePic = localStorage.getItem("profilePic")
        let userData = Cookies.get(userId);
        if (profilePic) {
            setProfilePic(profilePic)
        }

        if (userId && userData) {
            setCurrentUser(userId)
            setDisplayName(JSON.parse(userData)[0].fullname)
        }
        setNav(false)
        setShowDropdown(false)
        if (ref.current) {
            ref.current.style.left = "100%";
        }

    }, [path])


    if (path === "/signup") {
        return null
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            Cookies.remove(currentUser)
            localStorage.removeItem("currentUserId")
            localStorage.removeItem("profilePic")
            setCurrentUser(null)
            navigate("/")
        }).catch((error) => {
            console.log(error)
        });
    }
    const showNav = () => {
        setNav(!nav)
        if (ref.current.style.left === "0%") {
            setShowDropdown(false)
            ref.current.style.left = "100%";
            return;
        }
        ref.current.style.left = "0%"
    }
    const visitProfile = () => {
        navigate("/profile")
    }

    return (
        <>
        
            <nav>
                <div className={styles.navWrapper}>
                    <div className={styles.logo}>
                        <Link to={"/"}>
                            <img width={100} height={100} src='/images/mainLogo.png' />
                        </Link>
                    </div>
                    <div onClick={showNav} className={`${styles.toggle} ${nav ? styles.toggleActive : ""}`}></div>
                    {
                        currentUser ?
                            <img width={50} onClick={visitProfile} className={styles.mobileProfile} height={50} loading='lazy' src={profilePic} alt="profile" /> :
                            <li className={`${styles.sellerBtn} ${styles.mobileSellerBtn}`}>
                                <Link className={styles.loginLink} to={"/login"}>Login</Link>
                            </li>
                    }

                    <ul ref={ref} className='popFont'>
                        <li><Link className={`${path === "/" ? `${styles.active}` : ""} ${styles.navLinks}`} to={"/"}>Home</Link>
                        </li>
                        <li><Link className={`${path === "/contact" ? `${styles.active}` : ""} ${styles.navLinks}`} to={"/contact"}>Contact Us</Link></li>
                        <li><Link className={`${path === "/about" ? `${styles.active}` : ""} ${styles.navLinks}`} to={"/about"}>About Us</Link></li>
                        {
                            currentUser &&
                            <li>
                                <div className={styles.userIcon}>
                                    <img width={100} height={100} loading='lazy' src={profilePic} alt="profile" />
                                    <IoMdArrowDropdown onClick={() => { setShowDropdown(!showDropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" size={30} color='#fff' />
                                    {showDropdown &&
                                        <div className={styles.dropDown}>
                                            <div className={styles.userData}>
                                                <div>
                                                    <img width={100} height={100} loading='lazy' src={profilePic} alt="profile" />
                                                    <p>{displayName}</p>
                                                </div>
                                                <div>
                                                    <Link to={"/profile"}>View profile</Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <BiSpreadsheet size={20} /> <span>
                                                        <Link to={"/myads"}>
                                                            My Ads
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <BsChatDots size={20} /> <span>
                                                        <Link to={"/chat"}>
                                                            Inbox
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <AiOutlineHeart size={20} /> <span>
                                                        <Link to={"/wishlist"}>
                                                            My Wishlists
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <BiHelpCircle size={20} />
                                                    <span>Help</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div onClick={handleLogout} className={styles.otherDrops}>Logout</div>
                                        </div>
                                    }
                                </div>

                            </li>
                        }
                        {currentUser &&
                            <li className={styles.sellerBtn}>
                                <Link className={`${path === "/sell" ? `${styles.active}` : ""} ${styles.seller}`} to={"/sell"}>
                                    <div>
                                        Sell
                                        <AiOutlinePlusCircle />
                                    </div>
                                </Link>
                            </li>
                        }
                        {!currentUser && (
                            <li className={styles.sellerBtn}><Link className={`${path === "/login" ? `${styles.active}` : ""} ${styles.loginLink}`} to={"/login"}>Login</Link></li>
                        )
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar