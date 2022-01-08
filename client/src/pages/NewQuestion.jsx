import React, { useState } from "react";
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

function NewQuestion({ userName }) {
  const navigate = useNavigate();
  const [questionDetail, setQuestionDetail] = useState({
    username: userName,
    fullname: "",
    colour: "",
    language: "",
  });

  //for every change in details, update the state
  const handleChange = (event) => {
    const name = event.target.name;
    setQuestionDetail({ ...questionDetail, [name]: event.target.value });
  };

  //   on submitting form
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(questionDetail);
    await axios.post(`/api/question/`, questionDetail).then((res) => {
      window.alert(`Submission Complete!`);
      navigate(-1);
    });
  };
  return (
    <>
      <h1>Questionaire for {userName}</h1>
      <Label>Full Name:</Label>
      <Input
        type="text"
        name="fullname"
        minLength="2"
        value={questionDetail.fullname}
        onChange={(event) => handleChange(event)}
        required
      />
      <Label>Favourite Colour:</Label>
      <Input
        type="checkbox"
        name="colour"
        value={questionDetail.colour}
        onChange={(event) => handleChange(event)}
      />
      Pink
      <Input
        type="checkbox"
        name="colour"
        value={questionDetail.colour}
        onChange={(event) => handleChange(event)}
      />
      Red
      <Input
        type="checkbox"
        name="colour"
        value={questionDetail.colour}
        onChange={(event) => handleChange(event)}
      />
      Blue
      <Label>Preferred Coding Language:</Label>
      <Input
        type="radio"
        name="language"
        value={questionDetail.language}
        onChange={(event) => handleChange(event)}
      />
      Python
      <Input
        type="radio"
        name="language"
        value={questionDetail.language}
        onChange={(event) => handleChange(event)}
      />
      Javascript
      <Button onClick={(event) => handleSubmit(event)}>Submit</Button>
    </>
  );
}

export default NewQuestion;
