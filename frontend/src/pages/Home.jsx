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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';




// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


export const Home = () => {


  const [category, setCategory] = useState("");
  const [noContent, setNoContent] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [limit, setLimit] = useState(9);


  const context = useContext(glxContext);
  const { getItem, items, searchItem, showSkeleton, loadMoreBtn, getItems, search, setSearch } = context;

  useEffect(() => {

    let currentUser = localStorage.getItem("currentUserId")
    if (currentUser) {
      setCurrentUser(currentUser)
    }

    getItems()
  }, [])

  useEffect(() => {
    if (search !== "" && searchItem.length === 0) {
      setNoContent(true)
    }
  }, [searchItem])

  // Load More Items
  const loadMore = () => {
    setLimit(limit + 9)
    getItem(limit + 9, currentUser)
  }



  // Filtering by Category
  const handleCategory = (val) => {
    removeAllFilters();
    setCategory(val)
    const ite = items.filter(item => {
      if (item.product_category.includes(val)) {
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
      setNoContent(false)
    }
  }



  // Remove all Filters ie. Category and Search
  const removeAllFilters = () => {
    setCategory("")
    setNoContent(false)
    setSearch("")
  }


  return (
    <>
      <main>
        <div className={`${styles.heroSec} popFont heroSection`}  >
          <Swiper style={{ height: "100%" }} loop={true} centeredSlides={true} navigation={true} autoplay={{delay: 3000}} modules={[Autoplay, Navigation]}>
            <SwiperSlide>
              <div className={styles.sliderContent} style={{ background: "#FDE44C" }}>
                <div className={styles.imgContainer}>
                  <img src="images/slider1.webp" alt="" />
                </div>
                <div className={styles.sliderText}>
                  <h3 style={{ color: "#42413D" }}>The Shot <br />Showcase</h3>
                  <p>Blow-dry and style in one simple step!</p>
                  <button className={`popFont ${styles.sliderBtn}`}>Buy Now</button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.sliderContent} style={{background: "#D4E9FF"}}>
                <div className={styles.imgContainer}>
                  <img src="images/slider2.webp" alt="" />
                </div>
                <div className={styles.sliderText}>
                  <h3 style={{ color: "#6D8CC0" }}>Go for glossy</h3>
                  <p>New to the Liquid Glass Collection!</p>
                  <button className={`popFont ${styles.sliderBtn}`}>Buy Now</button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className={styles.sliderContent} style={{background: "#F1E4E1"}}>
                <div className={styles.imgContainer}>
                  <img src="images/slider3.webp" alt="" />
                </div>
                <div className={styles.sliderText}>
                  <h3 style={{ color: "#824459" }}>Meet your rescue <br />Crew</h3>
                  <p>New to the Liquid Glass Collection!</p>
                  <button className={`popFont ${styles.sliderBtn}`}>Buy Now</button>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>

        </div>
      </main>
      <Category removeAllFilters={removeAllFilters} handleCategory={handleCategory} />

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
                    items && search === "" && items.map((item, i) => {
                      if (category && item.product_category.toLowerCase().includes(category.toLowerCase())) {
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
                  {search !== "" && searchItem && searchItem.map((item, i) => {
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
