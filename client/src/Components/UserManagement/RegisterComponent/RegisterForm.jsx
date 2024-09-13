import React, { useRef } from "react";
import styles from "./RegisterForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function RegisterForm() {
  const firstNameEl = useRef();
  const lastNameEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();
  const navigate = useNavigate();

  const handleRegister = (ev) => {
    ev.preventDefault();
    const firstname = firstNameEl.current.value;
    const lastname = lastNameEl.current.value;
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    firstNameEl.current.value = "";
    lastNameEl.current.value = "";
    emailEl.current.value = "";
    passwordEl.current.value = "";

    registerUser(firstname, lastname, email, password);
  };

  const registerUser = (firstname, lastname, email, password) => {
    // console.log(firstname, lastname);
    const jsonUserData = { firstname, lastname, email, password };
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      axios
        .post("/users/register", JSON.stringify(jsonUserData), {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          toast.success("Register Successfull", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-md-10 mx-auto col-lg-5">
      <form
        className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
        onSubmit={handleRegister}
      >
        <h3 className={"display-7 lh-1 mb-3 text-center " + styles.formHeading}>
          Register
        </h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            ref={firstNameEl}
            className="form-control"
            id="floatingFirstName"
            placeholder="first name"
          />
          <label htmlFor="floatingInput">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            ref={lastNameEl}
            className="form-control"
            id="floatingLastName"
            placeholder="last name"
          />
          <label htmlFor="floatingInput">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            ref={emailEl}
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            ref={passwordEl}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className={"w-100 btn " + styles.loginBtnStyle} type="submit">
          Sign Up
        </button>
        <hr className="my-4" />
        <small className="text-body-secondary">
          Already have an account ?
          <Link to={"/login"} className="mx-2">
            <span className={styles.loginLinkStyle}>login</span>
          </Link>
        </small>
      </form>
    </div>
  );
}
