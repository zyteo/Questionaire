import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Label = styled.label`
  margin: 7px 5px;
`;
const Input = styled.input`
  font-family: "Spartan", sans-serif;
  margin: 5px;
  padding: 2px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
`;
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
function ShowQuestion({ userName }) {
  const navigate = useNavigate();
  // for the question responses
  const [questionResponse, setQuestionResponse] = useState({});
  const [checkboxResponse, setCheckboxResponse] = useState([]);

  // check if the user have completed the questionaire or not
  useEffect(() => {
    async function getQuestionData() {
      await axios
        .get(`/api/question/${userName}`)
        .then((res) => {
          setQuestionResponse(res.data.data);
          // for checkbox responses
          for (const key in res.data.data.colour) {
            if (res.data.data.colour[key] === true) {
              checkboxResponse.push(key);
            }
          }
        })
        .catch((err) => console.log(err));
    }
    getQuestionData();
  }, []);

  // const checkboxDetails = checkboxResponse?.map((ele) => {
  //   return <p>{ele}</p>;
  // });

  // for back button
  const handleBack = async () => {
    navigate(-1);
  };

  return (
    <>
      <h1>Responses for {userName}</h1>
      <br />
      <h3>Full Name:</h3>
      {questionResponse.fullname}
      <br />
      <h3>Favourite Colour:</h3>
      {checkboxResponse?.map((ele) => {
        return <p>{ele}</p>;
      })}
      <br />
      <h3>Preferred Coding Language:</h3>
      {questionResponse.language}
      <br />
      <Button onClick={() => handleBack()}>Back</Button>
    </>
  );
}

export default ShowQuestion;
