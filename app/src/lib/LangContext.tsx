"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, t as translate } from "./i18n";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: Parameters<typeof translate>[0]) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "ru",
  setLang: () => {},
  t: (key) => translate(key, "ru"),
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  const tFn = (key: Parameters<typeof translate>[0]) => translate(key, lang);

  return (
    <LangContext.Provider value={{ lang, setLang, t: tFn }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
