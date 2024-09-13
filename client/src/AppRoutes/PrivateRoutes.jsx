import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export function ProtectHomeRoutes({ element }) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return element;
}

export function ProtectAuthRoutes({ element }) {
  const token = localStorage.getItem("authToken");
  if (token) {
    return <Navigate to={"/home"} replace />;
  }
  return element;
}

export function ProtectMainRoute({ element }) {
  const token = localStorage.getItem("authToken");
  if (token) {
    return <Navigate to={"/home"} replace />;
  }
  return element;
}
