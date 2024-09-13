import React from "react";
import LoginForm from "./LoginForm";
import LoginImg from "./LoginImg";

export default function LoginComponent() {
  return (
    <>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-2">
          <LoginImg />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
