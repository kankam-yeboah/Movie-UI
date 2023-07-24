import React, { useRef } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { useAuth } from "../utils/auth";

export default function Login() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignIn = async () => {
    try {
      const [email, password] = [emailInput.current.value, passwordInput.current.value];
      await signInWithEmailAndPassword(firebaseAuth, email, password);

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
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Sign In</h3>
            </div>
            <div className="container flex column">
              <input type="email" placeholder="Email Address" name="email" ref={emailInput} />
              <input type="password" placeholder="Password" name="password" ref={passwordInput} />
              <button onClick={handleSignIn}>Sign In</button>
              <div className="form-info flex column">
                <div className="form-info-checkpoint flex a-center j-between">
                  <div className="form-info-checkbox">
                    <input type="checkbox" name="remember" id="remember" checked />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <Link to="/forgot-password">Need help?</Link>
                </div>
                <div className="form-info-signup flex a-center">
                  <p>New to Netflix?</p>
                  <Link to="/signup">Sign up now.</Link>
                </div>
                <div className="form-info-security">
                  <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
                </div>
              </div>
            </div>
          </div>
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
    .form-container {
      .form {
        gap: 2rem;
        width: 25vw;
        min-width: 30rem;
        padding: 2rem;
        background-color: #000000b0;
        border-radius: 0.5rem;
        .title {
          font-size: 2rem;
          h3 {
            padding: 0 10rem;
          }
        }
        .container {
          gap: 2rem;
          width: 25rem;
          input {
            color: white;
            border: none;
            padding: 1.2rem 2rem;
            font-size: 1.3rem;
            border: 1px solid black;
            border-radius: 0.25rem;
            background-color: #585757af;
            &::placeholder {
              font-size: 1.3rem;
            }
            &:focus {
              outline: none;
            }
          }
          button {
            margin-top: 2rem;
            padding: 1.2rem 2rem;
            border-radius: 0.25rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            font-weight: bolder;
            font-size: 1.05rem;
            color: white;
          }
          .form-info {
            margin-top: -20px;
            color: #9c9b9bae;
            font-size: 1.2rem;
            gap: 0.7rem;
            .form-info-checkpoint {
              .form-info-checkbox {
                display: flex;
                align-items: center;
                input {
                  margin-right: 0.5rem;
                  width: 20px;
                  height: 20px;
                  border-radius: 0.3rem;
                  accent-color: #a09f9fae;
                }
              }
              a {
                color: #a09f9fae;
                text-decoration: none;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
            .form-info-signup {
              margin-top: 4rem;
              font-size: 1.4rem;
              a {
                text-decoration: none;
                margin-left: 0.2rem;
                color: whitesmoke;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
`;
