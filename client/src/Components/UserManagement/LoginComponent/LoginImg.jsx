import React from "react";
import LoginStorySet from "../../../assets/vector_image/Images/Login_Story_set.svg";
import styles from "./LoginImg.module.scss";

export default function LoginImg() {
  return (
    <div className="col-lg-7 text-center text-lg-start">
      <img
        src={LoginStorySet}
        alt=""
        srcSet=""
        className={"img-fluid " + styles.loginImgStyle}
      />
    </div>
  );
}
