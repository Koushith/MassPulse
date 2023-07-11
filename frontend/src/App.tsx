import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./index.css";
import { HomePage } from "./pages";
import axios from "axios";
import { Container, NavBar } from "./components";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context";
import { getAPIURL } from "./utils";

function App() {
  console.log("env-", getAPIURL());
  return (
    <>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
