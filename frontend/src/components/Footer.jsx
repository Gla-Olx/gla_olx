import React from 'react'
import styles from '../styles/footer.module.css'
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    let path = useLocation().pathname;

    if (path === "/login") {
        return null
    }

    return (
        <>
            <footer>
                <div className={styles.footerWrapper}>
                    <div className={styles.content}>
                        <div className={styles.title}>GLA OLX</div>
                        <div className={styles.list}>
                            <ul>
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/profile'}>Profile</Link></li>
                                <li><Link to={'/help'}>Help</Link></li>
                                <li><Link to={"/about"}>About</Link></li>
                                <li><Link to={"/contact"}>Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>Follow Us</div>
                        <div className={styles.socialMedia}>
                            <div className={styles.iconList}>
                                <ul>
                                    <CiFacebook cursor={"pointer"} className={styles.icons} />
                                    <CiInstagram cursor={"pointer"} className={styles.icons} />
                                    <CiTwitter cursor={"pointer"} className={styles.icons} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.logo}>
                        <img width={100} height={100} src="/images/logo.png" alt="logo" />
                    </div>
                    <div className={styles.copyright}>
                        <p>All rights reserved © 2023 GLA-OLX </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer