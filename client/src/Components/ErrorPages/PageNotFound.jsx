import React from "react";
import ErrorPage from "../../assets/vector_image/Images/error_404_story_Set.svg";
import styles from "./PageNotFound.module.scss";

export default function PageNotFound() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <img
        className={"img-fluid "+styles.errorPageImgStyle}
        src={ErrorPage}
        alt=""
        width="72"
        height="57"
      />
      <h1 className="display-5 fw-bold text-body-emphasis">Oops!</h1>
      <div className="col-lg-6 mx-auto">
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>The page you're looking for does not exist.</i>
        </p>
      </div>
    </div>
  );
}
