import React from 'react'
import styles from '../styles/ChatSeller.module.css'
import { CiWarning } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const ChatWithSeller = ({ chatData }) => {
  const navigate = useNavigate()
  const startChat = () => {
    const { currentUser, seller, item, itemPrice } = chatData
    navigate(`/chat?currentUser=${currentUser}&userTempToken=${seller}&item=${item}&itemPrice=${itemPrice}`)
  }
  return (
    <>
      <div className={styles.box}>
        <div className={styles.top}>
          <CiWarning size={50} />
        </div>
        <div className={styles.content}>
          <span>Tips for Safe Chat</span>
          <p>Don&apos;t share any personal information either to buyers or sellers</p>
          <hr />
          <p>Never give any money in advance</p>
          <hr />
          <p>Be kind to others, no abuse, chat gently</p>
        </div>
        <button onClick={startChat}>Chat With Seller</button>
      </div>
    </>
  )
}

export default ChatWithSeller