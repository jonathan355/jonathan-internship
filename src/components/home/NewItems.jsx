import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'


const NewItems = () => {
    const {id} = useParams();
    const [newItem, setNewItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    

    const CountdownTimer = ({ expiryDate }) => {
      const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
      });

      

      useEffect(() => {
        if (!expiryDate || expiryDate === null || expiryDate === '' || expiryDate === undefined) {
        return <span>-</span>;
      }

        const calculateTimeLeft = () => {
          const expiryTime = expiryDate.toString().length === 10
          ? expiryDate * 1000
          : new Date(expiryDate).getTime();
          const now = new Date().getTime();
          const difference = expiryTime - now;

          if (difference > 0) {
            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60))  / (1000 * 60));
            const seconds = Math.floor(difference % (1000 * 60) / 1000);

            return { hours, minutes, seconds };
          }

          return { hours: 0, minutes: 0, seconds: 0 };

        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(()  => {
          const newTimeLeft = calculateTimeLeft();
          setTimeLeft(newTimeLeft);

          if (newTimeLeft.hours === 0 &&
              newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
            clearInterval(timer);
              }
      }, 1000);

      return () => clearInterval(timer);
        }, [expiryDate]);

        if (!expiryDate || expiryDate === null || expiryDate === '' || expiryDate === undefined) {
        return <span>-</span>;
      }

      return (
        <span>

          {timeLeft.hours > 0 && `${timeLeft.hours}h `} {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      );
    };
  
    const [sliderRef, instanceRef] = useKeenSlider({
      slides: {
        perView: 4,
        spacing: 15,
     },
     loop: true,
     slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
     },
     breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 }
      },
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 15 }
      }
    }
    });

    useEffect (() => {
    
      const fetchNewItems = async() => {
        try {
          const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
          setNewItems(response.data);
            } catch (error) {
          console.error('Error fetching New Items:', error);
            } finally {
          setLoading(false);
            }
      };
    
      fetchNewItems();
    },[id]);

    const goToPrevious = () => {
  if (instanceRef.current) {
    instanceRef.current.prev();
  }
};

const goToNext = () => {
  if (instanceRef.current) {
    instanceRef.current.next();
  }
};


    if(loading) {
  return (
    <div className="container">
    <div className="row">
    <div className="slider-container" style={{position:'relative'}}>
      <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
      <div ref={sliderRef} className="keen-slider">
        {Array(4).fill().map((_, index) => (
            <div className="keen-slider__slide" key={index} >
             <div className="nft_coll skeleton">
                <div className="nft_wrap">
                    <div className="skeleton-image"></div>
                </div>
                <div className="nft_coll_pp">
                    <div className="skeleton-author-image"></div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                   <div className="skeleton-title"></div>
                  <div className="skeleton-code"></div>
                </div>
              </div>
            </div>
              ))}
      </div>
    <button
          
          className="arrow left-arrow"
          disabled={true}
          style={{
            position: 'absolute',
            left: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius:'50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer'
          }}
         >
          &#10094;
         </button>
    <button
          
          className="arrow right-arrow"
          disabled={true}
          style={{
            position: 'absolute',
            right: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius:'50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer'

          }}
        >
          &#10095;
        </button>
        </div>
      </div>
  </div>
  );
}

if (!newItem.length){
  return <div>No New Items found.</div>;
}


    

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="slider-container"
               style={{ position: 'relative' }}
               data-aos="fade-in" >
            <div ref={sliderRef} className="keen-slider">
          {newItem.map((item, index) => (
            <div className="keen-slider__slide" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title= { item.title }
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  <CountdownTimer expiryDate = {item.expiryDate} />
                  </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/itemDetails/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/itemDetails/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        <button
          onClick={goToPrevious}
          className="arrow left-arrow"
          style={{
            position: 'absolute',
            left: '45px',
            top: '65%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius:'50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer'
          }}
         >
          &#10094;
         </button>
         <button
          onClick={goToNext}
          className="arrow right-arrow"
          style={{
            position: 'absolute',
            right: '45px',

            top: '65%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius:'50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer'

          }}
        >
          &#10095;
        </button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
