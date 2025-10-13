import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'



const HotCollections = () => {
  const {id} = useParams();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const fetchHotCollections = async() => {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
      setCollection(response.data);
    } catch (error) {
      console.error('Error fetching Hot Collection:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchHotCollections();
},[id]);

if(loading) {
  return (
    <div className="container">
    <div className="row">
    <div className="slider-container" style={{position:'relative'}}>
      <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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

if (!collection.length){
  return <div>No collections found.</div>;
}

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



  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

      <div className="slider-container" style={{ position: 'relative' }}>
        <div ref={sliderRef} className="keen-slider">
          {collection.map((item, index) => (
          <div className="keen-slider__slide" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/itemDetails/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt={item.title} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy pp-coll" src={item.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC- {item.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

         <button
          onClick={goToPrevious}
          className="arrow left-arrow"
          style={{
            position: 'absolute',
            left: '-10px',
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
          onClick={goToNext}
          className="arrow right-arrow"
          style={{
            position: 'absolute',
            right: '-10px',
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
    </section>
  );
};

export default HotCollections;
