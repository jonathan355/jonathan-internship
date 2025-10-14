import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { useParams,Link } from "react-router-dom";
import axios from 'axios';
import AOS from 'aos';



const ItemDetails = () => {
  const { nftId } = useParams(); 
  const [ itemDetails, setItemDetails ] = useState (null);
  const [ loading, setLoading ] = useState(true);


  useEffect (() => {
    const fetchItemDetails = async() => {
      try{
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 5000));

        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        console.log("API Response:", response.data);
        setItemDetails(response.data);
         } catch (error) {
          console.error('Error fetching Item Details:', error);
         } finally {
          setLoading(false);
         }
    };

   if (nftId) {
    fetchItemDetails();
   }
  }, [nftId]);

   useEffect(() => {
      if (!loading && nftId) {
          AOS.refreshHard();
        }
      }, [loading, nftId]);
  

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div 
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    style={{
                      width: '100%',
                      height: '400px',
                      backgroundColor: '#e0e0e0',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}
                  ></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                  <div 
                      style={{
                        width: '60%',
                        height: '32px',
                        backgroundColor: '#e0e0e0',
                        marginBottom: '20px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}
                    ></div>
                    <div className="item_info_counts" style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ width: '80px', height: '20px', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                        <div style={{ width: '80px', height: '20px', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                      <div style={{ width: '100%', height: '16px', backgroundColor: '#e0e0e0', marginBottom: '8px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      <div style={{ width: '90%', height: '16px', backgroundColor: '#e0e0e0', marginBottom: '8px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      <div style={{ width: '70%', height: '16px', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                      <div style={{ width: '60px', height: '20px', backgroundColor: '#e0e0e0', marginBottom: '10px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                        <div style={{ width: '120px', height: '20px', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                      <div style={{ width: '60px', height: '20px', backgroundColor: '#e0e0e0', marginBottom: '10px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                        <div style={{ width: '120px', height: '20px', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ width: '60px', height: '20px', backgroundColor: '#e0e0e0', marginBottom: '10px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      <div style={{ width: '100px', height: '24px', backgroundColor: '#e0e0e0', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!itemDetails) {
    return (
      <div id="wrapper">
        <div className="container mt-5">
          <div className="text-center">
            <h3>Item not found</h3>
          </div>
        </div>
      </div>
    );
  }

  const item = itemDetails;


    return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row"
                 data-aos="fade-in"
            >
              <div className="col-md-6 text-center"
                   
              >
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info"
                     
                >
                  <h2>{item.title} #{item.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>{item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
