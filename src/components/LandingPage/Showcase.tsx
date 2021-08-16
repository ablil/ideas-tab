import React, { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from "../../assets/icons/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/icons/moon.svg";
import { ReactComponent as LeftArrow } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../assets/icons/arrow-right.svg";

import IdeasDark from "../../assets/showcase/ideas-dark.png";
import IdeasLight from "../../assets/showcase/ideas-light.png";
import InfoDark from "../../assets/showcase/info-dark.png";
import InfoLight from "../../assets/showcase/info-light.png";
import QueueDark from "../../assets/showcase/queue-dark.png";
import QueueLight from "../../assets/showcase/queue-light.png";

const icons = [
  {
    dark: IdeasDark,
    light: IdeasLight,
  },
  {
    dark: InfoDark,
    light: InfoLight,
  },
  {
    dark: QueueDark,
    light: QueueLight,
  },
];

const Showcase = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [picture, setPicture] = useState(IdeasLight);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setPicture(isDarkTheme ? icons[index].dark : icons[index].light);
  }, [isDarkTheme, index]);

  return (
    <section>
      <div className="flex-center my-4">
        <SunIcon className="w-4 h-auto" />
        <label className="switch">
          <input
            type="checkbox"
            onClick={(_) => setIsDarkTheme((old) => !old)}
          />
          <span className="slider round"></span>
        </label>
        <MoonIcon className="w-4 h-auto" />
      </div>
      <div className="flex-center">
        <LeftArrow
          className="w-12 h-auto cursor-pointer"
          onClick={(_) =>
            setIndex((old) => (old + icons.length - 1) % icons.length)
          }
        />
        <div className="mx-auto max-w-6xl rounded-lg p-4 bg-gray-200 shadow-lg">
          <div className="max-w-6xl rounded-lg bg-gray-400 p-4 shadow-md">
            <img src={picture} alt="showcase" />
          </div>
        </div>
        <RightArrow
          className="w-12 h-auto cursor-pointer"
          onClick={(_) => setIndex((old) => (old + 1) % icons.length)}
        />
      </div>
    </section>
  );
};

export default Showcase;
