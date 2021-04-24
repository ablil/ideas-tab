import React, { FC, useEffect, useState } from "react";
import { ReactComponent as Moonicon } from "../../assets/icons/moon.svg";
import { ReactComponent as Sunicon } from "../../assets/icons/sun.svg";

const ThemeSwitch: FC<{ className?: string }> = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (localStorage.theme !== "dark" && localStorage.theme !== "light") {
      localStorage.setItem("theme", "dark");
    }
    if (localStorage.theme === "dark") {
      setIsDarkMode(true);
      document.querySelector("html")!.className = "dark";
    }

    if (localStorage.theme === "light") {
      setIsDarkMode(false);
      document.querySelector("html")!.className = "";
    }
  }, []);

  const toggleTheme = () => {
    if (localStorage.theme === "dark") {
      document.querySelector("html")!.className = "";
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.querySelector("html")!.className = "dark";
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  return isDarkMode ? (
    <Sunicon className={`${className} cursor-pointer`} onClick={toggleTheme} />
  ) : (
    <Moonicon className={`${className} cursor-pointer`} onClick={toggleTheme} />
  );
};

export default ThemeSwitch;
