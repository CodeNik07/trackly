import React from "react";
import styles from "./WelcomePage.module.scss";
import TypeWriter from "./TypeWriter";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const text = "Welcome to Trackly";
  const navigate = useNavigate();

  const handleGetStart = () => {
    navigate("/register");
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.mainInnerdiv}`}>
        <h1 className={`${styles.mainHeadApp}`}>W<TypeWriter text={"elcome to Trackly"} delay={300} infinite={true} /></h1>
        <p>Streamline your workflow with Task Management Tool Trackly.</p>
        <button className={`btn ${styles.mainGetstarted}`} onClick={()=>{handleGetStart()}} >Get Started</button>
      </div>
    </div>
  );
}
