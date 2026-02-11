import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import global from "../assets/globe-color.svg.svg";

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <nav className="relative inline-block text-left" aria-label="Language switcher">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center transition"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img src={global} alt="Change language" className="w-10 h-10" />
      </button>

      {open && (
        <ul
          className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
          role="menu"
        >
          <li>
            <button
              onClick={() => changeLanguage("en")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t("LanguageSwitch.English")}
            </button>
          </li>

          <li>
            <button
              onClick={() => changeLanguage("ar")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t("LanguageSwitch.Arabic")}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default LanguageSwitcher;
