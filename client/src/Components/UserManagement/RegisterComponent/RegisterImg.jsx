import React from "react";
import RegisterStorySet from "../../../assets/vector_image/Images/Registration_story_set.svg";
import styles from "./RegisterImg.module.scss";

export default function RegisterImg() {
  return (
    <div className="col-lg-7 text-center text-lg-start">
      <img src={RegisterStorySet} alt="" srcSet="" className={"img-fluid "+styles.registerImgStyle} />
    </div>
  );
}
