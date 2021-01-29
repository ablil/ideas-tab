import React, { FunctionComponent, useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

const InputModal: FunctionComponent<{
  title: string;
  isShown: boolean;
  onEnter: (value: any) => void;
  onClose: () => void;
}> = ({ title, isShown, onEnter, onClose }) => {
  const [visibility, setVisibility] = useState(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue('');
    setVisibility(isShown);
  }, [isShown]);

  return (
    <section
      style={{
        zIndex: 1,
        background: "rgba(0,0,0,.4)",
        display: visibility ? "block" : "none",
      }}
      className="tansparent block w-full h-full fixed top-0 left-0"
      onClick={(e) => {
        setVisibility(false);
        onClose();
      }}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="content bg-gray-900 border-2 border-blue-400 w-3/4 lg:w-4/6 mx-auto mt-40 flex flex-col"
      >
        <header className="p-1 text-blue-400  text-sm uppercase truncate">
          {title}
          <CloseIcon
            onClick={(_) => {
              setVisibility(false);
              onClose();
            }}
            className="w-4 h-4 text-blue-400 float-right cursor-pointer"
          />
        </header>
        <article className="w-full center-with-flex">
          <input
            autoFocus={true}
            className="w-40 border-2 border-blue-400 rounded p-1 m-4 text-gray-50 opacity-50 bg-gray-800 w-5/6"
            type="text"
            value={value}
            placeholder="Type here"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onEnter(value);
                setVisibility(false);
                onClose();
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        </article>
      </section>
    </section>
  );
};

export default InputModal;
