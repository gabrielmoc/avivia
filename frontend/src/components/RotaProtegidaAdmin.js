import React from "react";
import { Navigate } from "react-router-dom";

const RotaProtegidaAdmin = ({ children }) => {
  const tokenAdmin = localStorage.getItem("token_admin");

  return tokenAdmin ? children : <Navigate to="/admin" />;
};

export default RotaProtegidaAdmin;
