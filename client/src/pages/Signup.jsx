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

function SignUp({ language }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const addUser = async (user) => {
    await axios
      .post(`/api/signup`, user)
      .then((res) => {
        alert("New user created successfully!");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.message === "username exists") {
          alert("Sorry, username is already taken!");
        } else if (err.response.data.message === "email exists") {
          alert("Sorry, name is already taken!");
        } else {
          alert("Sorry, there was an error somehow. Try again?");
        }
      });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, email: value });
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, password: value });
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, confirmPassword: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long!");
    } else if (user.confirmPassword !== user.password) {
      alert("Passwords do not match!");
    } else {
      addUser(user);
    }
  };

  return (
    <>
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleEmailChange}
          required
        ></Input>
        <br />
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          value={user.username}
          onChange={handleUsernameChange}
          required
        ></Input>
        <br />
        <Label>Password:</Label>
        <Input
          type="password"
          name="password"
          value={user.password}
          onChange={handlePasswordChange}
          required
        ></Input>
        <br />
        <Label>Confirm password:</Label>
        <Input
          type="password"
          name="confirm.password"
          value={user.confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        ></Input>
        <br />
        <Button>Sign up</Button>
      </form>
    </>
  );
}

export default SignUp;
