import React from "react";
import { Navigate } from "react-router-dom";

const RotaProtegidaPrescritor = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/acesso-prescritor" />;
  }

  return children;
};

export default RotaProtegidaPrescritor;
