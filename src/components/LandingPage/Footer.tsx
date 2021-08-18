import React from "react";
import { ReactComponent as CoffeeIcon } from "../../assets/icons/hot-cup.svg";

const Footer = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="flex-center">
        <p className="max-w-md mx-auto py-12 font-bold text-2xl text-center">
          This is an open source project, if you have any issue or you think you
          can to contribute to the development process, feel free to check the
          project{" "}
          <a
            className="text-2xl"
            href="https://github.com/ablil/ideas-tab"
            target="_blank"
          >
            repository
          </a>{" "}
          or open an issue.
        </p>
      </div>

      <footer className="p-4 uppercase flex justify-end items-center text-white">
        <a
          className="text-white no-underline hover:gray-100"
          href="https://github.com/ablil/ideas-tab/issues"
          target="_blank"
        >
          new feature or issue ?
        </a>
        <a
          className="text-white no-underline hover:gray-100"
          href="https://github.com/ablil/ideas-tab"
          target="_blank"
        >
          source code
        </a>
        <a className="text-white no-underline hover:gray-100" href="/terms">
          terms &and; conditions
        </a>
      </footer>
    </section>
  );
};

export default Footer;
