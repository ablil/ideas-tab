import React from "react";
import { useHistory } from "react-router-dom";

const TermsPage = () => {
  const history = useHistory();

  return (
    <section className="w-screen h-screen pl-12 pt-12">
      <h1 className="text-3xl capitalize">terms and conditions</h1>
      <p>We don't use cookies or any tracking shit</p>
      <p>
        The source code is completely published on{" "}
        <a
          className="text-3xl"
          href="https://github.com/ablil/ideas-tab."
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        , feel free to contribute.
      </p>

      <a href="/" className="block mt-4">
        go home
      </a>
    </section>
  );
};

export default TermsPage;
