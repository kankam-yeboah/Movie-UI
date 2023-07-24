import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

export default function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showPassword, setShowPassword] = useState(0);
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSignIn = async () => {
    try {
      const [email, password] = [emailInput.current.value, passwordInput.current.value];
      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          auth.login(currentUser);
          navigate("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container showpassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere, Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create or restart membership</h6>
          </div>
          <form className="form">
            <input type="email" placeholder="Email Address" name="email" ref={emailInput} />
            {!showPassword ? <button onClick={() => setShowPassword(1)}>Get Started</button> : <input type="password" placeholder="Password" name="password" ref={passwordInput} />}
          </form>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1em;
      .text {
        gap: 1em;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 15rem;
        }
      }
      form {
        display: grid;
        grid-template-columns: ${({ showpassword }) => (showpassword === 1 ? "1fr 1fr" : "2fr 1fr")};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          font-weight: bolder;
          font-size: 1.05rem;
          color: white;
        }
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      border-radius: 0.2rem;
      font-weight: bolder;
      font-size: 1.05rem;
      color: white;
    }
  }
`;
