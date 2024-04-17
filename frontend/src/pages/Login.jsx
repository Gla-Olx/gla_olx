import styles from '../styles/signup.module.css'
import { useEffect, useState, useContext, useRef } from 'react'
import glxContext from '../context/glxContext'
import { auth, db } from "../middleware/firebase"
import {
    createUserWithEmailAndPassword,
    updateProfile, signInWithEmailAndPassword
} from "firebase/auth";
import { FiUnlock } from 'react-icons/fi'
import { FiLock } from 'react-icons/fi'
import UserSetup from '../components/UserSetup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDoc } from "firebase/firestore";
import Cookies from 'js-cookie';
import { BsArrowLeftShort } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router-dom'


export const Login = () => {
    const ref = useRef()
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    let userSetup = params.get("userSetup");
    const [loader, setLoader] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [LoggedInUser, setLoggedInUser] = useState(null)
    const [showSetup, setShowSetup] = useState(false)
    const [credentials, setCredentials] = useState({ fullname: '', email: '', password: '' })
    const context = useContext(glxContext);
    const { getUser, user, getItem, items } = context;


    useEffect(() => {
        if (localStorage.getItem("currentUserId")) {
            navigate("/");
        }
        if (userSetup) {
            setShowSetup(true)
        }

    }, [userSetup])


    const inputVerification = (login) => {
        const { fullname, email, password } = credentials;
        if (fullname === "" && !login) {
            warnFunc("Name is Required");
            return false;
        }
        if (email === "") {
            warnFunc("Email is Required");
            return false;
        }
        if (password === "") {
            warnFunc("Password is Required");
            return false;
        }
        if (password.length < 8) {
            warnFunc("Password must be of 8 characters")
            return false;
        }
        if (!email.includes("@gla.ac.in")) {
            warnFunc("Please Use Your University Email Id")
            return false
        }
        return true
    }

    const warnFunc = (message) => {
        toast.warn(message, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true)
        const { fullname, email, password } = credentials;
        let check = inputVerification();
        if (!check) {
            return;
        }
        try {
            setLoader(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const update = await updateProfile(auth.currentUser, {
                displayName: fullname,
            });

            let currentUser = userCredential.user;
            setLoggedInUser(currentUser);
            setLoader(false)
            setShowSetup(true)
            setShowLoader(false)
            navigate("/login?signup=true&userSetup=true", { replace: true })

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setShowLoader(true)
        const { email, password } = credentials;
        if (email === "") {
            warnFunc("Email is Required");
            setShowLoader(false)
            return;
        }
        if (password === "") {
            warnFunc("Password is Required");
            setShowLoader(false)
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("currentUserId", user.uid)
                getUserData(user.uid)
                setShowLoader(false)
            })
            .catch((error) => {
                warnFunc("Login Failed! Please try again.");
                setShowLoader(false)
            });

    }

    const getUserData = async (userId) => {
        let getExistingUserData = Cookies.get(userId)
        if (getExistingUserData) {
            return;
        }
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let data = []
            data.push(docSnap.data())
            localStorage.setItem("profilePic", docSnap.data().profilePic)
            Cookies.set(userId, JSON.stringify(data), { expires: 5 })
            window.location.href = "/"
        } else {
            console.log("User has not completed the setup yet. Redirecting to setup page.");
            navigate("/login?signup=true&userSetup=true", { replace: true })
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

        if (e.target.value === "") {
            e.target.previousElementSibling.classList.remove(styles.filled)
        } else {
            e.target.previousElementSibling.classList.add(styles.filled)
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={styles.container} >
                {
                    !loader && !showSetup ?
                        <div className={`jostFont ${styles.main}`}>
                            <div className={styles.backBtn}>
                                <BsArrowLeftShort size={30} onClick={() => { navigate("/") }} />
                            </div>
                            <input ref={ref} className={styles.input} type="checkbox" id={styles.chk} aria-hidden="true" />
                            <div className={styles.signup}>
                                <form className={styles.form}>
                                    <label onClick={() => { ref.current.checked = !ref.current.checked }} className={styles.label} htmlFor="chk" aria-hidden="true">Sign up</label>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
                                        <input id='name' className={styles.input} type="text" name="fullname" required="" onChange={handleChange} />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="email" className={styles.inputLabel}>University Email</label>
                                        <input className={styles.input} id='email' type="email" name="email" required="" onChange={handleChange} />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="pass" className={styles.inputLabel}>Create a Password</label>
                                        <input id="pass" className={styles.input} type={`${showPass ? "text" : "password"}`} name="password" required="" onChange={handleChange} />
                                        <FiLock className={`${styles.lock} ${showPass ? "hidden" : ""}`} onClick={() => { setShowPass(true) }} />
                                        <FiUnlock className={`${showPass ? "" : "hidden"} ${styles.unlock}`} onClick={() => { setShowPass(false) }} />
                                    </div>
                                    <button className={styles.button} onClick={handleSubmit}>
                                        {showLoader ? <span className={styles.btnLoader}></span> :
                                            "Sign up"}
                                    </button>
                                </form>
                            </div>

                            <div className={styles.login}>
                                <form>
                                    <label onClick={() => { ref.current.checked = !ref.current.checked }} className={styles.label} htmlFor="chk" aria-hidden="true">Login</label>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="name" className={styles.inputLabel}>Email</label>
                                        <input className={styles.input} type="email" name="email" required id='email' onChange={handleChange} />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="password" className={styles.inputLabel}>Password</label>
                                        <input className={styles.input} type={`${showPass ? "text" : "password"}`} id='password' name="password" onChange={handleChange} required />
                                        <FiLock className={`${styles.lock} ${showPass ? "hidden" : ""}`} onClick={() => { setShowPass(true) }} />
                                        <FiUnlock className={`${showPass ? "" : "hidden"} ${styles.unlock}`} onClick={() => { setShowPass(false) }} />
                                    </div>
                                    <button onClick={handleLogin} className={styles.button}>
                                        {
                                            showLoader ? <span className={styles.btnLoader}></span> :
                                                "Login"
                                        }
                                    </button>
                                </form>
                            </div>
                        </div> :
                        <span className={styles.loader}></span>
                }

            </div>
            {
                showSetup &&
                <UserSetup />
            }
        </>
    )
}
