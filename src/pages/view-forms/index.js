import React, { useEffect, useState } from "react";
import { useLocale } from "../../hooks/localeContext";
import styles from "./styles.module.scss";
import ApploggedInHeader from "../../layout/HeaderLoggedIn";
const { container } = styles;

const ViewForms = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { locale } = useLocale();

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("authToken");
  };
  useEffect(() => {
    const sessionTimeout = 0.5 * 60 * 60 * 1000;

    const startSessionTimer = () => {
      setTimeout(() => {
        handleLogout();
      }, sessionTimeout);
    };

    if (isLoggedIn) {
      startSessionTimer();
    }

    const handleUserActivity = () => {
      clearTimeout(startSessionTimer);
      startSessionTimer();
    };

    document.addEventListener("click", handleUserActivity);
    document.addEventListener("keypress", handleUserActivity);
    return () => {
      document.removeEventListener("click", handleUserActivity);
      document.removeEventListener("keypress", handleUserActivity);
    };
  }, [isLoggedIn]);
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    window.location.href = "/signin";
  }

  return (
    <div
      className={container}
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <ApploggedInHeader />
      <h1>jdfdsfs</h1>
    </div>
  );
};

export default ViewForms;
