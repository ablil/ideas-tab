import React from "react";

const LandingPageBanner = () => {
  return (
    <main className="text-center w-full my-12">
      <div>
        <header className="text-8xl font-black flex justify-center">
          <h1>ideas</h1>
          <h1 className="text-blue-400">tab</h1>
        </header>

        <article className="font-bold my-4 max-w-md mx-auto p-4">
          if your are a developer, this is the right place for you to save your
          side projects ideas.
        </article>

        <article className="mt-12">
          <a
            href="/register"
            className="py-4 px-8 rounded-lg font-bold uppercase bg-blue-400 hover:opacity-70 no-underline  text-white"
          >
            register now
          </a>
          {/* TODO: showcase the application, maybe as a video */}
        </article>
      </div>
    </main>
  );
};

export default LandingPageBanner;
