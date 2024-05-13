import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

import "./App.css";
import Resume from "./components/Resume";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile"

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./components/Projects";

export function App() {
  const [user, setUser] = useState({});
  // const [verified, setVerified] = useState(true);

  // useEffect(() => {
  //   if (!verified) {
  //     localStorage.removeItem("user");
  //     window.location.replace("/");
  //   }
  // }, [verified]);

  useEffect(() => {
    const theUser = localStorage.getItem("user");
    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  // Example Axios GET request
  useEffect(() => {
    axios.get("http://localhost:4000")
      .then(response => {
        console.log(response.data);
        // Update the user state with the received data
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={user?.email ? <Resume user={user} /> : <Home />}
          ></Route>
          <Route
            exact
            path="/signup"
            element={user?.email ? <Resume user={user} /> : <Signup />}
          ></Route>
          <Route
            exact
            path="/login"
            element={user?.email ? <Resume user={user} /> : <Login />}
          ></Route>
          <Route
          exact
          path="/project"
          element={<Projects/>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
