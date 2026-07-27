import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./languages/en.json";
import ru from "./languages/ru.json";
import am from "./languages/hy.json";

const resources = {
  am,
  en,
  ru,
};
export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS: "common",
  fallbackLng: "am",
});
