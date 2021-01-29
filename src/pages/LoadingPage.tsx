import React from "react";

const LoadingPage = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <article className="computer-container animate-pulse mt-32 flex flex-col">
        <div className="shadow-2xl w-80 h-32 bg-gray-800 text-xs text-green-200 rounded border-b-8 p-1">
          [user@box] ~/
        </div>
        <div className="bg-gray-200 w-2/4 mx-auto h-5"></div>
        <div className="bg-gray-200 w-4/6 mx-auto h-2 rounded"></div>
      </article>
      <article className="text-white animate-pulse py-4">Loading ...</article>
    </section>
  );
};

export default LoadingPage;
