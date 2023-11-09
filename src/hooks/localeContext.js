import React, { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("en"); // Default to English

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
