import React from 'react'
import { SiApostrophe } from "react-icons/si"
import styles from "../styles/noItem.module.css"

const NoItem = ({ message }) => {
    return (
        <div className={styles.noContent}>
            <div>
                <SiApostrophe color='var(--secondary)' size={50} />
            </div>
            <p className='popFont'> 
                {
                    message ? message : "Currently no items available to show"
                }
            </p>
        </div>
    )
}

export default NoItem