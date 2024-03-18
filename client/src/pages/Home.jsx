import React, { useEffect, useState, useContext } from 'react'
import styles from '../styles/Home.module.css'
import glxContext from '../context/glxContext';
import { BiSearchAlt2 } from 'react-icons/bi'
import Card from '../components/Card';
import { AiFillPlusCircle } from 'react-icons/ai'
import Category from '../components/Category';
import NoItem from '../components/NoItem';
import LoadingComponent from '../components/LoadingComponent';
import { IoIosClose } from "react-icons/io";

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


export const Home = () => {


  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [noContent, setNoContent] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [showSearchItem, setShowSearchItem] = useState("");
  const [searching, setSearching] = useState(false);
  const [limit, setLimit] = useState(9);


  const context = useContext(glxContext);
  const { getItem, items, getItemBySearch, searchItem, setSearchItem, showSkeleton, loadMoreBtn } = context;

  useEffect(() => {
    gsap.to('.animatedGroup', {
      scrollTrigger: {
        trigger: '.heroSection',
        start: '90% top',
        scrub: true,
        end: '30% 10%',
      },
      position: "fixed",
      duration: 1
    });
    let currentUser = localStorage.getItem("currentUserId")
    if (currentUser) {
      setCurrentUser(currentUser)
    }
    getItem(limit, currentUser)


  }, [])

  // Load More Items
  const loadMore = () => {
    setLimit(limit + 9)
    getItem(limit + 9, currentUser)
  }



  // Filtering by Category
  const handleCategory = (val) => {
    removeAllFilters();
    setShowSearchItem(false)
    setCategory(val)
    const ite = items.filter(item => {
      if (item.category.includes(val)) {
        return item
      }
    })
    if (ite.length === 0) {
      setNoContent(true)
    } else {
      setNoContent(false)
    }
  }

  // Searching for an Item
  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (e.target.value === "") {
      setShowSearchItem(false)
      setNoContent(false)
    }
  }
  const handleSearchItem = () => {
    setSearching(true);
    const ite = items.filter(item => {
      if (item.title.toLowerCase().includes(search.toLowerCase())) {
        return item
      }
    })
    if (ite.length === 0) {
      getItemBySearch(search, limit)
      if (searchItem.length === 0) {

        setNoContent(true)
        setShowSearchItem(false)
      } else {
        setShowSearchItem(true)
      }
      document.getElementById("cardSec").scrollIntoView();
    } else {
      document.getElementById("cardSec").scrollIntoView();
      setShowSearchItem(true)
      setSearchItem(ite)
      setNoContent(false)
    }
    setSearching(false);
  }


  // Remove all Filters ie. Category and Search
  const removeAllFilters = () => {
    setCategory("")
    setShowSearchItem(false)
    setNoContent(false)
    setSearch("")
  }


  return (
    <>
      <main>
        <div className={`${styles.heroSec} popFont heroSection`}  >
      <div className={`animatedGroup ${styles.searchBox}`} >
        <input disabled={searching} type="text" value={search} onChange={handleSearch} className={`aliceFont ${styles.inputSearch}`} placeholder="What are you looking for?..." />
        <button disabled={searching} className={`${searching ? styles.animateSearch : ""} ${styles.searchBtn}`}>
          <span onClick={handleSearchItem}>Search</span> <BiSearchAlt2 color='#D9D9D9' size={25} />
        </button>
      </div>
        </div>
      </main>
      <Category handleCategory={handleCategory} />

      <section className={styles.cardSec} id='cardSec'>
        {
          search !== "" ? <h3 className={`robotoFont ${styles.cardHead}`}>Search Result: <span className={styles.searchedItem}><IoIosClose onClick={removeAllFilters} size={25} />{search}</span>
          </h3> : category ? <h3 className={`robotoFont ${styles.cardHead}`}>Filtered Items: <span className={styles.searchedItem}><IoIosClose onClick={removeAllFilters} size={25} />{category}</span>
          </h3> :
            <h3 className={`robotoFont ${styles.cardHead}`}>Fresh Recommendation:</h3>
        }

        {
          showSkeleton ? <div className={styles.productList}>
            <LoadingComponent />
          </div> :
            items?.length === 0 ? <NoItem /> :
              noContent ? <NoItem /> :
                <div className={styles.productList}>
                  {
                    items && !showSearchItem && items.map((item, i) => {
                      if (category && item.category.toLowerCase().includes(category.toLowerCase())) {
                        return (
                          <Card item={item} key={i} />
                        )
                      }
                      else if (!category) {
                        return (
                          <Card item={item} key={i} />
                        )
                      }
                    })
                  }
                  {showSearchItem && searchItem && searchItem.map((item, i) => {
                    return (
                      <Card item={item} key={i} />
                    )
                  })}
                </div>
        }

        {
          !noContent && loadMoreBtn &&
          <button onClick={loadMore} className={`popFont ${styles.loadMore}`} >
            Load More <AiFillPlusCircle color='#fff' size={25} />
          </button>
        }
      </section >

    </>
  )
}
