import React, { useState } from "react";
import { Navigate } from "react-router";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(true);
  const [jwt, setJwt] = useLocalState("", "jwt");
  if (jwt) {
    fetchService(
      `http://localhost:8080/validate?token=${jwt}`,
      "get",
      jwt
    ).then((valid) => {
      setIsValid(valid);
    });
  }
  return isValid ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
