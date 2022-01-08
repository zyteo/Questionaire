import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import SignUp from "./pages/Signup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import NavBar from "./pages/NavBar";
import NewQuestion from "./pages/NewQuestion";
import EditQuestion from "./pages/EditQuestion";
import ShowQuestion from "./pages/ShowQuestion";

function App() {
  const [auth, setAuth] = useState("NoAuth");
  const [userName, setUsername] = useState("");

  const navigate = useNavigate();
  // handle function for logging out, passed as props to navbar
  const handleLogOut = async () => {
    await axios.get(`/api/logout`);
    setAuth("NoAuth");
    setUsername("");
    localStorage.removeItem("token");
    navigate(`/`);
  };

  return (
    <div className="App">
      <NavBar auth={auth} handleLogOut={handleLogOut} userName={userName} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Login setAuth={setAuth} setUsername={setUsername} />}
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome auth={auth} userName={userName} />} />
        <Route path="/question" element={<NewQuestion userName={userName}/>}/>
        <Route path="/question_edit" element={<EditQuestion userName={userName}/>}/>
        <Route path="/question_response" element={<ShowQuestion userName={userName}/>}/>
      </Routes>
    </div>
  );
}

export default App;
