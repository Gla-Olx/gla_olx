import React, { useState } from "react"
import glxContext from "./glxContext";
;
import {
    doc, getDoc, addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../middleware/firebase"
import { useNavigate } from "react-router-dom";


const GlxState = ({ children }) => {
    const [users, setUsers] = useState([])
    const [items, setItems] = useState([])
    const [userItems, setUserItems] = useState([])
    const [loadMoreBtn, setLoadMore] = useState(true)
    const [show, setShow] = useState("hidden")
    const [message, setMessage] = useState("")
    const [showSkeleton, setShowSkeleton] = useState(false)
    // const navigate = useNavigate();
    const [searchItem, setSearchItem] = useState([])
    const host = "http://localhost:8080"

    // Function to get Items
    const getItem = async (limit, currentUser) => {
        setShowSkeleton(true);
        const res = await fetch(`${host}/api/item?limit=${limit}&currentUser=${currentUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { data, loadMore } = await res.json()
        setItems(data)
        if (loadMore === false) {
            setLoadMore(false)
        }
        setShowSkeleton(false);
    }

    // Function to get User Items
    const getUserItem = async (id) => {
        const res = await fetch(`${host}/api/user-item?id=${id}`, {
            method: 'GET',
        })
        const { data } = await res.json()
        setUserItems(data);
    }

    // Function to add user in chat
    const addUser = async (userToken, currentUser, itemName, itemPrice) => {
        try {
            let res = await fetch(`${host}/api/addchattingwith`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userToken, currentUser, itemName, itemPrice })
            })
            let { data } = await res.json()
            if (data) {
                getAllUsersData(data.chattingWith)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    //  Function to get Item By Search 
    const getItemBySearch = async (search, limit) => {
        setShowSkeleton(true);
        const res = await fetch(`${host}/api/search-item?search=${search}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { data } = await res.json()
        setSearchItem(data)
        setShowSkeleton(false);
    }

    // Function to create Item
    const createItem = async (item) => {
        setShowSkeleton(true);
        const { title, desc, price, category, subCategory, seller, sellerName, sellerPic } = item
        const metaData = { title, desc, price, category, subCategory, seller, sellerName, sellerPic }
        const formData = new FormData()
        item.images.forEach((file) => formData.append("media", file));
        formData.append('metaData', JSON.stringify(metaData))
        const res = await fetch(`${host}/api/item`, {
            method: 'POST',
            body: formData
        })
        const result = await res.json()
        if (result.success) {
            setMessage("Ad Created Successfully")
            showAlert()
            setItems([...items, result.data])
            setShowSkeleton(false);
            // navigate("/myads") // TODO: Redirect to myads page
        }
    }

    // Function to delete Item
    const deleteItem = async (id) => {
        const res = await fetch(`${host}/api/item?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { success } = await res.json()
        if (success) {
            setMessage("Ad Deleted Successfully")
            showAlert()
            setUserItems(items.filter((item) => item._id !== id))
        }
    }



    // Function to add user into chat list
    const getChattingWith = async () => {  // Working Fine
        setShowSkeleton(true);
        let currentUser = localStorage.getItem("currentUserId");

        try {
            let res = await fetch(`${host}/api/chattingwith?id=${currentUser}`)
            let data = await res.json();
            if (data.success) {
                getAllUsersData(data.chattingWith.chattingWith)
            }
        } catch (error) {
            // console.error(error.message);
        }
        finally {
            setShowSkeleton(false);
        }
    }

    // Function to getAllUsersData in chat
    const getAllUsersData = async (chattingWith) => {
        let newUsers = []
        for (let i = 0; i < chattingWith.length; i++) {
            const docRef = doc(db, "users", chattingWith[i].userToken);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                newUsers.push({ itemName: chattingWith[i].itemName, itemPrice: chattingWith[i].itemPrice, ...docSnap.data() })
            }
        }
        setUsers(newUsers)
        setShowSkeleton(false);
    }


    // Function to show Alert Box
    const showAlert = () => {
        setShow("")
        setTimeout(() => {
            setShow("hidden")
        }, 2500)
    }
    return (
        <glxContext.Provider value={{ createItem, getItem, deleteItem, getItemBySearch, items, addUser, searchItem, setSearchItem, getChattingWith, getAllUsersData, users, show, message, setMessage, setShow, getUserItem, userItems, showSkeleton, loadMoreBtn, showAlert }}>
            {children}
        </glxContext.Provider>
    )
}

export default GlxState;