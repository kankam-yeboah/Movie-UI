import React from "react";
import { styled } from "styled-components";

const Card = ({ movieData }) => {
  return (
    <Container>
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} title={movieData.name} alt={movieData.name} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 250px;
  width: 250px;
  height: 100%;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default Card;
