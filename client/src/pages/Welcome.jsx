import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const Button = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  padding: 10px;
  margin: 6px 2px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #EFBE93;
  transition: all 0.5s ease;
  &:hover {
    background-color: rgb(228, 228, 228);
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
  &:active {
    background-color: grey};
  }
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 10px;
    position: relative;
  }
  @media only screen and (max-width: 400px) {
    font-size: 8px;
  }
  @media only screen and (max-width: 300px) {
    font-size: 6px;
  }
  `;
  
function Welcome({ language, auth }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState("");

  // only authenticated users can access welcome page
  useEffect(()=> {
    let token = localStorage.getItem("token");
    if (auth !== "Auth" || (!token)){
      navigate("/");
    }
    else if (token){
      let tokenInfo = jwt_decode(token);
      setUserDetails(tokenInfo);
    }
  },[])

  
  const handleLink = () => {
    window.location.href = "https://google.com/";
  };

  return (
    <>
      <h1>Welcome!</h1>
      
      {userDetails?.question ? (
        <Button onClick={() => handleLink()}>Link</Button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Welcome;