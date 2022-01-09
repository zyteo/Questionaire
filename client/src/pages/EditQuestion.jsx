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

function EditQuestion({ userName }) {
  const navigate = useNavigate();
  // for the colours checkbox
  const [checkColors, setCheckColors] = useState({
    pink: false,
    red: false,
    blue: false,
  });
  // for all the questions
  const [questionDetail, setQuestionDetail] = useState({
    username: userName,
    fullname: "",
    colour: "",
    language: "",
  });
  // get question response to populate the questionaire
  useEffect(() => {
    async function getQuestionData() {
      await axios
        .get(`/api/question/${userName}`)
        .then((res) => {
          setQuestionDetail({
            username: res.data.data.username,
            fullname: res.data.data.fullname,
            colour: res.data.data.colour,
            language: res.data.data.language,
          });
          setCheckColors({
            pink: res.data.data.colour.pink,
            red: res.data.data.colour.red,
            blue: res.data.data.colour.blue,
          });
        })
        .catch((err) => console.log(err));
    }
    getQuestionData();
  }, []);

  //for every change in details, update the state
  const handleNameChange = (event) => {
    setQuestionDetail({ ...questionDetail, fullname: event.target.value });
  };
  const handleRadioChange = (event) => {
    setQuestionDetail({ ...questionDetail, language: event.target.value });
  };

  const onChangePink = () => {
    setCheckColors({ ...checkColors, pink: !checkColors.pink });
    setQuestionDetail({ ...questionDetail, colour: checkColors });
  };
  const onChangeRed = () => {
    setCheckColors({ ...checkColors, red: !checkColors.red });
    setQuestionDetail({ ...questionDetail, colour: checkColors });
  };
  const onChangeBlue = () => {
    setCheckColors({ ...checkColors, blue: !checkColors.blue });
    setQuestionDetail({ ...questionDetail, colour: checkColors });
  };

  //   on submitting form
  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.put(`/api/question/${userName}`, questionDetail).then((res) => {
      alert(`Update Complete!`);
      navigate(-1);
    });
  };

  // for back button
  const handleBack = async () => {
    navigate(-1);
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
        onChange={(event) => handleNameChange(event)}
        required
      />
      <br />
      <Label>Favourite Colour:</Label>
      <Input
        type="checkbox"
        onChange={() => onChangePink()}
        defaultChecked={questionDetail.colour.pink}
      />
      Pink
      <Input
        type="checkbox"
        onChange={() => onChangeRed()}
        defaultChecked={questionDetail.colour.red}
      />
      Red
      <Input
        type="checkbox"
        onChange={() => onChangeBlue()}
        defaultChecked={questionDetail.colour.blue}
      />
      Blue
      <br />
      <Label>Preferred Coding Language:</Label>
      <Input
        type="radio"
        name="language"
        value="Python"
        onChange={(event) => handleRadioChange(event)}
      />
      Python
      <Input
        type="radio"
        name="language"
        value="Javascript"
        onChange={(event) => handleRadioChange(event)}
      />
      Javascript
      <Button onClick={(event) => handleSubmit(event)}>Submit</Button>
      <Button onClick={() => handleBack()}>Back</Button>
    </>
  );
}

export default EditQuestion;
