import React, { useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfo } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Netflix() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="Background" className="background-image" />
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className="flex a-center j-center" onClick={() => navigate("/player")}>
              <FaPlay /> Play
            </button>
            <button className="flex a-center j-center">
              <AiOutlineInfo /> More Info
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
      object-fit: cover;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          height: 100%;
          width: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          gap: 1rem;
          font-size: 1.4rem;
          padding: 0.5rem 2.4rem;
          border: none;
          border-radius: 0.2rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
