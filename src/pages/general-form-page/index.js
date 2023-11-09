import React from "react";
import styles from "./styles.module.scss";
import GeneralForm from "../../components/GeneralForm";
import AppHeader from "../../layout/Header";
import { useLocale } from "../../hooks/localeContext";
const { container } = styles;

const GeneralFormPage = () => {
  const { locale } = useLocale();
  return (
    <div
      className={container}
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <AppHeader />
      <GeneralForm />
    </div>
  );
};

export default GeneralFormPage;
