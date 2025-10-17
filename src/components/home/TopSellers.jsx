import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const {id} = useParams();
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopSellers = async() => {
    try {
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);
      setTopSellers(response.data);
    } catch (error) {
      console.error('Error fetching Top Sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect (() => {
    fetchTopSellers();
},[id]);


if (loading) {
  return (
  <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {Array(12).fill().map((_,index) => (
              <li key={index}>
                  <div className="author_list_pp ">
                  </div>
                  <div className="skeleton-author-image ">
                    <i className="fa fa-check skeleton-title"></i>
                  </div>
                  
                
                  <div className="skeleton-title">
                    <div className="skeleton-author-name skeleton-title"></div>
                    <div className="skeleton-code" ></div>
                  </div>
              </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
    )
}

if (!topSellers.length){
  return <div>No Top Sellers found.</div>;
}

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12"
               data-aos="fade-in"
          >
            <ol className="author_list">
              {topSellers.map((item, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{ item.authorName }</Link>
                    <span>{ item.price } ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
