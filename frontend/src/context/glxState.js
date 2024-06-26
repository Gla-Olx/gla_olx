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


const GlxState = ({ children }) => {
    const [users, setUsers] = useState([])
    const [items, setItems] = useState([])
    const [userItems, setUserItems] = useState([])
    const [loadMoreBtn, setLoadMore] = useState(true)
    const [show, setShow] = useState("hidden")
    const [message, setMessage] = useState("")
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [searchItem, setSearchItem] = useState([])
    const [search, setSearch] = useState("");
    const host = "http://localhost:8080"
    const host2 = "http://localhost:8000"

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
        // setItems(data)
        if (loadMore === false) {
            setLoadMore(false)
        }
        setShowSkeleton(false);
    }

    const getItems = async (limit, currentUser) => {
        setShowSkeleton(true);
        const res = await fetch(`${host2}/api/products/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setItems(data)
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
        const res = await fetch(`${host2}/api/products?search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setSearchItem(data)
        setShowSkeleton(false);
    }

    // Function to create Item
    const createItem = async (item) => {
        setShowSkeleton(true);

        const formData = new FormData();

        for (let i = 0; i < item.images.length; i++) {
            formData.append(`proimg${i + 1}`, item.images[i])
        }
        delete item.images

        formData.append('data', JSON.stringify(item))
        const res = await fetch(`${host2}/api/products/create/`, {
            method: 'POST',
            body: formData
        })
        const result = await res.json()
        if (result.success) {
            setMessage("Ad Created Successfully")
            showAlert()
        //     setItems([...items, result.data])
            setShowSkeleton(false);
            // TODO: Redirect to myads page
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
        <glxContext.Provider value={{ getItems, createItem, getItem, deleteItem, getItemBySearch, items, addUser, searchItem, setSearchItem, getChattingWith, getAllUsersData, users, show, message, setMessage, setShow, getUserItem, userItems, showSkeleton, loadMoreBtn, showAlert, search, setSearch }}>
            {children}
        </glxContext.Provider>
    )
}

export default GlxState;