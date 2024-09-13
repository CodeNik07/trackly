import React from "react";
import RegisterForm from "./RegisterForm";
import RegisterImg from "./RegisterImg";

export default function RegisterComponent() {
  return (
    <>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-2">
          <RegisterImg />
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
