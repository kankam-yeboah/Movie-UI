import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaPowerOff } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "../utils/auth";

export default function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
          auth.logout();
          navigate("/login");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              className="btn-navbar"
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input type="text" placeholder="Search" onMouseEnter={() => setInputHover(true)} onMouseLeave={() => setInputHover(false)} onBlur={() => setShowSearch(false)} />
          </div>
          <button className="btn-navbar" onClick={handleLogout}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: rgba(0, 0, 0, 0.9);
  }
  nav {
    position: fixed;
    top: 0;
    height: 6.5rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    padding: 0 2rem;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            text-decoration: none;
            color: white;
          }
        }
      }
    }
    .right {
      gap: 0.1rem;
      .btn-navbar {
        border: none;
        background-color: transparent;
        padding: 0.5rem;
        cursor: pointer;
        &focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          svg {
            color: white;
          }
        }
        input {
          background-color: transparent;
          color: white;
          border: none;
          opacity: 0;
          visibility: hidden;
          width: 0;
          transition: 0.2s ease-in-out;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
