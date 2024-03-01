import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectIsAuthenticated } from "./redux/slices/authenticationSlice";

function App() {
  const navigate = useNavigate();
  const isAlreadyLoggedIn = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAlreadyLoggedIn) {
      navigate("/login");
    }
  }, [isAlreadyLoggedIn, navigate]);

  return isAlreadyLoggedIn ? <Outlet /> : null;
}

export default App;
