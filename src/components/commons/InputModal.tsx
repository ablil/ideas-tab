import React, { FunctionComponent, useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

const InputModal: FunctionComponent<{
  title: string;
  subtitle: string;
  isVisible: boolean;
  type: string;
  onOk: (value: any) => void;
  onCancel: () => void;
}> = ({ title, subtitle, isVisible, type, onOk, onCancel }) => {
  const [visibility, setVisibility] = useState(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue("");
    setVisibility(isVisible);
  }, [isVisible]);

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
        onCancel();
      }}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="content bg-gray-900 border-2 border-blue-400 w-3/4 lg:w-3/6 mx-auto mt-40 flex flex-col"
      >
        <header className="relative p-2">
          <h2 className="text-blue-400 capitalize pl-2">{title}</h2>
          <h6 className="truncate text-blue-200 text-xs capitalize pl-2">
            {subtitle}
          </h6>
          <CloseIcon
            onClick={onCancel}
            className="w-8 h-8 rounded-full opacity-70 hover:bg-blue-400 hover:text-gray-50 hover:opacity-100 duration-300 text-blue-400 absolute top-2 right-2 cursor-pointer"
          />
        </header>
        <article className="w-full center-with-flex">
          <input
            autoFocus={true}
            className="border-2 border-blue-400 rounded p-1 m-4 text-gray-50 opacity-50 bg-gray-800 w-full"
            type={type}
            value={value}
            placeholder="Type here"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onOk(value);
                onCancel();
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        </article>
        <footer className="flex justify-end">
          <button
            onClick={onCancel}
            className="rounded p-1 m-1 capitalize text-red-500 hover:bg-red-500 hover:text-gray-50 duration-300"
          >
            Cancel
          </button>
          <button onClick={(e) => {
            onOk(value);
            onCancel()
          }} className="rounded py-1 px-2 m-2 uppercase bg-blue-400 opacity-80 hover:opacity-100 duration-300">
            Ok
          </button>
        </footer>
      </section>
    </section>
  );
};

export default InputModal;
