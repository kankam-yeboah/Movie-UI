import React, { useState } from "react";
import { convertToNumPerc } from "../utils/HelperFn";
import { styled } from "styled-components";
import video from "../assets/video.mp4";
import { SlLike, SlDislike } from "react-icons/sl";
import { AiOutlinePlus } from "react-icons/ai";
import { IoHeartCircleOutline } from "react-icons/io";
import { BsPlayCircle } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const Card = ({ movieData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handlePlayerBtnClick = () => {
    navigate("/player");
  }

  return (
    <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="card">
        {/* onMouseHover over the card component render detailed component of the movie card*/}
        {!isHovered ? (
          <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} title={movieData.name} alt={movieData.name} />
        ) : (
          <div className="movieCardDetailContainer">
            <video src={video} muted autoPlay={false} />
            <div className="movieCardDetail flex j-between">
              <div className="movieCardDetailInfo flex column">
                <h6>{movieData.name}</h6>
                <div className="movie-card-ref">
                  <span>{`${convertToNumPerc(movieData.popularity)}% match`}</span>
                  <span>{movieData?.releaseDate?.slice(0,4)}</span>
                  {/* <span>{movieData?.adultRate}</span>  attach a 14+ rating flag to the moive card if rating is false*/}
                </div>
                <div className="movie-card-overview">
                  <p>{`${movieData?.overview} ...`}</p>
                </div>
              </div>
              <div className="movieCardDetailIcons flex column">
                  <SlLike />
                  <SlDislike />
                  <AiOutlinePlus />
              </div>
            </div>
            <div className="movieCardPlayBtn">
                <BsPlayCircle onClick={handlePlayerBtnClick} />
            </div>
            <div className="movieCardDownArror">
              <SlArrowDown />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .card {
    width: 250px;
    height: 150px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      height: 100%;
      width: 400px;
      background-color: #6a6969;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
    .movieCardDetailContainer {
      position: relative;
      video {
        width: 100%;
        height: 100%;
      }
      .movieCardDetail {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 6rem 1rem 0rem 1rem;
        .movieCardDetailInfo {
          width: 80%;
          gap: 0.2rem;
          h6 {
            text-transform: capitalize;
            font-size: 12px;
          }
          .movie-card-ref {
            display: flex;
            gap: 0.3rem;
            span {
              font-size: 12px;
              color: #fff;
              &:nth-child(1) {
                color: #448d44;
                font-weight: 700;
              }
              &:nth-child(2) {
                font-weight: 700;
              }
            }  
          }
          .movie-card-overview {
            p {
              font-size: 12px;
              font-weight: lighter;
            }
          }    
        }
        .movieCardDetailIcons {
          gap: 0.4rem;
          svg{
            font-size: 20px;
            &:hover {
              color:red;
            }
          }
        }
      }
      .movieCardPlayBtn {
      position: absolute;
      top: 0;
      left: 0;
      height: 40%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      svg {
        font-size: 50px;
        &:hover {
          color:red;
        } 
      }
    }
    .movieCardDownArror {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 27%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      svg {
        font-size: 30px;
        &:hover {
          color:red;
        }
      }  
    }
    }
  }
`;

export default Card;
