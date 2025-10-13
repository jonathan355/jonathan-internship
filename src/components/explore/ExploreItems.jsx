import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);
  const [ filterType, setFilterType ] = useState("")

  

  const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState({
      hours: 0,
      minutes: 0,
      seconds: 0
    });

    useEffect (() => {
      if (!expiryDate || expiryDate === null || expiryDate === '' ||expiryDate === undefined) {
        return;
      }

      const calculateTimeLeft = () => {
        try {
          let expiryTime;
          if (expiryDate.toString().length === 10) {
          expiryTime = expiryDate * 1000;
          } else {
            expiryTime = new Date(expiryDate).getTime();
          }


        const now = new Date().getTime();
        const difference = expiryTime - now;

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor(difference % (1000 * 60) / 1000);

          return { hours, minutes, seconds };
        }
      } catch (error) {
        console.error('Error calculating time left:', error);
      }
        return { hours: 0, minutes: 0, seconds: 0 }
      };

      const initialTimeLeft = calculateTimeLeft();
      setTimeLeft(initialTimeLeft);


        const timer = setInterval(()  => {
          const newTimeLeft = calculateTimeLeft();
          setTimeLeft(newTimeLeft);

          if (newTimeLeft.hours === 0 &&
              newTimeLeft.minutes === 0 && 
              newTimeLeft.seconds === 0) {

            clearInterval(timer);
              }
             }, 1000);

            return () => clearInterval(timer);
          }, [expiryDate]);
    
           if (!expiryDate || expiryDate === null || expiryDate === '' ||expiryDate === undefined) {
          return <span>-</span>;
      }

      if (!timeLeft || typeof timeLeft !== 'object') {
        return <span>Loading...</span>;
      }
  
return (
  <div>
    {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
  </div>
);
};

useEffect (()  => {
  const fetchExploreItems = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`);
        setExploreItems(response.data);
      } catch (error) {
        console.error("Error fetching Explore Items:", error);
      } finally {
        setLoading(false);
      }
};

fetchExploreItems();
},[]);

const getFilteredItems = () => {
    if (!filterType) {
      return exploreItems;
    }

    const itemsCopy = [...exploreItems];

    switch (filterType) {
      case "price__low__to__high":
        return itemsCopy.sort ((a, b)=> parseFloat(a.price) - parseFloat(b.price));
      case "price__high__to__low":
        return itemsCopy.sort ((a, b)=> parseFloat(b.price) - parseFloat(a.price));
      case "likes__high__to__low":
        return itemsCopy.sort ((a, b)=> parseInt(b.likes) - parseInt(a.likes));

        default:
          return exploreItems;
    }
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilterType(newFilter);
    
  };


const handleLoadMore = () => {
  setLoadingMore(true);

  setTimeout (() => {
    setDisplayedItems(prev => prev + 4);
    setLoadingMore(false);
  }, 1000);
};

const filteredItems = getFilteredItems();
const itemsToShow = filteredItems.slice(0, displayedItems);
const hasMoreItems = displayedItems < filteredItems.length;

if(loading) {
  return (
    <>
    <div>
        <select id="filter-items" defaultValue="" disabled>
          <option value="">Default</option>
          <option value="price__low__to__high">Price, Low to High</option>
          <option value="price__high__to__low">Price, High to Low</option>
          <option value="likes__high__to__low">Most liked</option>
        </select>
      </div>
    {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
                <img className="skeleton-fast" src="" alt="" />
            </div>
            <div className="nft__item_wrap skeleton-fast">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
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
            </div>
            <div className="nft__item_info skeleton">
              <div className="nft__item_price skeleton"></div>
            </div>
          </div>
        </div>
      ))}
      </>
    );
}

  return (
    <>
      <div>
        <select id="filter-items" value={filterType} onChange={handleFilterChange}
        style= {{
          padding: '8px 12px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
        >
          <option value="">Default</option>
          <option value="price__low__to__high">Price, Low to High</option>
          <option value="price__high__to__low">Price, High to Low</option>
          <option value="likes__high__to__low">Most liked</option>
        </select>
      </div>
      {itemsToShow.map((item, index) => (
        <div
          key={item.id || index}

          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">
              <CountdownTimer expiryDate = {item.expiryDate}/>
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
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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

        {hasMoreItems && (
            <div className="col-md-12 text-center">

           <button 
            id="loadmore" 
            className="btn-main lead"
            onClick={handleLoadMore}
            disabled={loadingMore}
            style= {{
              cursor: loadingMore ? 'not-allowed' : 'pointer',
              opacity: loadingMore ? 0.7 : 1
            }}
            >
              {loadingMore ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}  

        {!hasMoreItems && exploreItems.length > 8 && (
          <div className="col-md-12 text-center">
            <p className="text-muted">All items loaded</p>
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="col-md-12 text-center">
            <p className="text-muted">No items found for the selected filter.</p>
          </div>
        )}
    </>
  );
};

export default ExploreItems;
