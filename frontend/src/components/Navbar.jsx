import React, { useEffect, useState, useRef, useContext } from 'react'
import styles from "../styles/navbar.module.css"
import { Link, Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AiOutlinePlusCircle, AiOutlineHeart } from 'react-icons/ai'
import { BiHelpCircle, BiSpreadsheet } from 'react-icons/bi'
import { BsChatDots } from 'react-icons/bs'
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from 'react-icons/io'
import { signOut } from "firebase/auth";
import { auth } from "../middleware/firebase"
import SubCategory from './SubCategory'
import glxContext from '../context/glxContext'



const Navbar = () => {
    const ref = useRef();
    const searchRef = useRef();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState()
    const [nav, setNav] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [profilePic, setProfilePic] = useState("/images/user.png")
    const [displayName, setDisplayName] = useState("")
    const [show, setShow] = useState(false)
    const [subMenuCategory, setSubMenuCategory] = useState("");
    const [searchVal, setSearchVal] = useState("")

    const context = useContext(glxContext);
    const { getItemBySearch, searchItem } = context;


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

    const showSearch = () => {
        searchRef.current.style.visibility = "visible";
        searchRef.current.style.width = "250px";
    }

    const handleSubMenu = (e) => {
        setShow(true);
        setSubMenuCategory(e.target.innerText)

    }
    const hideSubMenu = () => {
        setShow(false)
    }

    const handleSearchItem = () => {
        getItemBySearch(searchVal, 9);
        document.getElementById("cardSec").scrollIntoView();
    }

    const handleChange = (e) => {
        setSearchVal(e.target.value);
    }


    const visitProfile = () => {
        navigate("/profile")
    }


    return (
        <>
            <nav>
                <div className={styles.navbar}>
                    <ul className={`${styles.navigation} latoFont`}>
                        <li className={styles.active}>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={'/contact'}>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to={'/about'}>
                                About Us
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.links}>
                        <div className={styles.searchLinks}>
                            <img onClick={showSearch} src="images/search.svg" alt="" />
                            <input onChange={handleChange} onKeyDown={(e) => { e.key === "Enter" && e.target.value !== "" && handleSearchItem(); }} value={searchVal} ref={searchRef} type="text" className={styles.searchInput} placeholder='Search for your favourite products' />
                            {/* <div className={styles.enterBtn}>Enter ↵</div> */}
                        </div>
                        <div className={styles.accountLinks}>
                            <img src="images/my-account.svg" alt="" />
                        </div>
                    </div>

                </div>
                <div className={styles.navbarBottom}>
                    <img src="images/logo.png" alt="" />
                    <div onMouseLeave={hideSubMenu} className={styles.navbarBottomLinks}>
                        <a onMouseEnter={handleSubMenu} className={styles.navLinkBottom} href="#">Lab Items</a>
                        <a onMouseEnter={handleSubMenu} className={styles.navLinkBottom} href="#">Room Items</a>
                        <a onMouseEnter={handleSubMenu} className={styles.navLinkBottom} href="#">Books</a>
                        <a onMouseEnter={handleSubMenu} className={styles.navLinkBottom} href="#">Sports Items</a>
                        <a onMouseEnter={handleSubMenu} className={styles.navLinkBottom} href="#">Gadgets</a>
                        <a onMouseEnter={handleSubMenu} className={styles.navLinkBottom} href="#">Accessories</a>
                        <a onMouseEnter={handleSubMenu} className={styles.navLinkBottom} href="#">Clothes</a>
                        <SubCategory subMenuCategory={subMenuCategory} show={show} setShow={setShow} />
                    </div>
                    <Link to={'/sell'} className={styles.bookmarkBtn}>
                        <span className={styles.IconContainer}>
                            <FaPlus />
                        </span>
                        <p className={styles.text}>Sell</p>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar


