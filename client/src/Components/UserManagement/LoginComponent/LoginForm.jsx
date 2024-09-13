import React, { useEffect, useRef } from "react";
import styles from "./LoginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../Store/UserSlice";

export default function LoginForm() {
  const userState = useSelector((store) => store.usersAuth);
  const dispatch = useDispatch();

  const emailEl = useRef();
  const passwordEl = useRef();
  const navigate = useNavigate();

  const handleLogin = (ev) => {
    ev.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    emailEl.current.value = "";
    passwordEl.current.value = "";

    const jsonUserData = { email, password };
    loginUser(jsonUserData);
  };

  const loginUser = async (jsonUserData) => {
    try {
      const response = await axios.post("/users/login", jsonUserData);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        if (response.data.userDoc._id) {
          dispatch(userActions.userLogin(response.data.userDoc));
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    if (userState.isAuthenticated) {
      navigate(`/home`);
    }
  }, [userState]);

  return (
    <div className="col-md-10 mx-auto col-lg-5">
      <form
        className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
        onSubmit={handleLogin}
      >
        <h3 className={"display-7 lh-1 mb-3 text-center " + styles.formHeading}>
          Login
        </h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            ref={emailEl}
            className="form-control"
            id="floatingInput"
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
          Sign in
        </button>
        <hr className="my-4" />
        <small className="text-body-secondary">
          Don't have an account?
          <Link to={"/register"} className="mx-2">
            <span className={styles.registerLinkStyle}>register</span>
          </Link>
        </small>
      </form>
    </div>
  );
}
