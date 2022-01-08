import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
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

function Welcome({ userName, auth }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState("");
  const [question, setQuestion] = useState(0);

  // only authenticated users can access welcome page
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (auth !== "Auth" || !token) {
      navigate("/");
    } else if (token) {
      let tokenInfo = jwt_decode(token);
      setUserDetails(tokenInfo);
    }
  }, []);

  // check if the user have completed the questionaire or not
  useEffect(() => {
    async function getQuestionData() {
      await axios
        .get(`/api/user/${userName}`)
        .then((user) => {
          // if user completed question, length is 1. otherwise 0.
          console.log(user.data.data.question.length);
          setQuestion(user.data.data.question.length);
        })
        .catch((err) => console.log(err));
    }
    getQuestionData();
  }, [userName]);

  const handleNewQuestion = () => {
    navigate("/question");
  };
  const handleEditQuestion = () => {
    navigate("/question_edit");
  };
  const handleViewResponse = () => {
    navigate("/question_response");
  };

  return (
    <>
      <h1>Welcome, {userName}!</h1>

      {question === 0 ? (
        <Button onClick={() => handleNewQuestion()}>Start Questionaire</Button>
      ) : (
        <>
          <Button onClick={() => handleEditQuestion()}>Edit Questionaire</Button>
          <Button onClick={() => handleViewResponse()}>View Response</Button>
        </>
      )}
    </>
  );
}

export default Welcome;
