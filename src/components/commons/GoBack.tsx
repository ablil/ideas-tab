import { FunctionComponent } from "react";
import { useHistory } from "react-router";

const GoBack: FunctionComponent = () => {
  const history = useHistory();

  return (
    <section className="flex items-center text-blue-400 hover:text-blue-500">
      <p
        onClick={(_) => history.goBack()}
        className="text-sm px-1 my-4 text-white bg-blue-400 dark:bg-yellow-400 flex items-center cursor-pointer hover:opacity-100 opacity-80"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Go Back
      </p>
    </section>
  );
};

export default GoBack;
