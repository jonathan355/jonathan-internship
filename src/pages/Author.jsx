import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import AOS from 'aos';


const Author = () => {

  const {authorId} = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
   const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);

    setAuthorData(prev => ({
      ...prev,
      followers: isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
  };

  useEffect (() => {
    const fetchAuthorItems = async() => {
      try{
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        setAuthorData(response.data);
         } catch (error) {
          console.error('Error fetching Author Items:', error);
         } finally {
          setLoading(false);
         }
    };
    fetchAuthorItems();
  }, [authorId]);

  useEffect(() => {
    if (!loading && authorData) {
        AOS.refreshHard();
      }
    }, [loading, authorData]);

  if (loading) {
  return(
<div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>


        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                     <div className="skeleton-fast"  style={{width: '150px', height: '150px', borderRadius: '50%'}}></div>
                      <div className="profile_name">
                        <div className="skeleton-fast" style={{width: '200px', height: '30px', marginBottom: '10px'}}></div>
                        <div className="skeleton-fast" style={{width: '150px', height: '20px'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="skeleton-fast" style={{width:'100px', height: '20px'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
  }

  if (!authorData) {
    return <div>Author not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar"
                         data-aos="fade-in"
                         >
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">@{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                          {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{authorData.followers} followers</div>
                      <button onClick={handleFollowClick}
                                      className="btn-main">
                                      {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
