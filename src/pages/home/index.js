import React, { useEffect } from "react";
import AppHeader from "../../layout/Header";
import { useLocale } from "../../hooks/localeContext";
import styles from "./styles.module.scss";
const { container } = styles;

const Home = () => {
  const { locale } = useLocale();
  useEffect(() => {
    window.location.href = "/general-form";
  }, []);
  return (
    <div
      className={container}
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <AppHeader />
    </div>
  );
};

export default Home;
