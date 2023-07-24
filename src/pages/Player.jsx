import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import { useNavigate } from "react-router-dom";

export default function Player() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="player">
        <div className="player-back-btn" onClick={() => navigate(-1)}>
          <BsArrowLeft />
        </div>
        <video src={video} controls autoPlay loop muted></video>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    position: relative;
    width: 100vw;
    height: 100vh;
    .player-back-btn {
      margin: 1rem;
      position: absolute;
      z-index: 1;
      &:hover {
        svg {
          color: red;
        }
      }
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
