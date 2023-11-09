import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { LocaleProvider, useLocale } from "./hooks/localeContext";

import Home from "./pages/home";
import GeneralFormPage from "./pages/general-form-page";
import ViewForms from "./pages/view-forms";
import Signin from "./pages/signin";

function App() {
  return (
    <LocaleProvider>
      <MainContent />
    </LocaleProvider>
  );
}

function MainContent() {
  const { locale } = useLocale();

  const translations = require(`./shared/locales/${locale}.json`);

  return (
    <IntlProvider locale={locale} messages={translations}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/general-form" element={<GeneralFormPage />} />
          <Route path="/view-forms" element={<ViewForms />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
