import React from "react";
import { ReactComponent as BrainIcon } from "../../assets/icons/brain.svg";
import { ReactComponent as PaperCraftIcon } from "../../assets/icons/paper-crafts.svg";
import { ReactComponent as InteractIcon } from "../../assets/icons/interact.svg";

const FeaturesList = () => {
  return (
    <section>
      <section className="flex justify-start items-center py-12">
        <div className="w-1/2 flex-center">
          <InteractIcon className="ml-auto w-72 max-w-sm h-auto" />
        </div>
        <div className="w-1/2 ml-4">
          <div className="max-w-md">
            <h1 className="text-5xl text-blue-400 py-4">
              Intuitive user experience
            </h1>
            <p className="text-3xl">
              quickly add new ideas to your ideas tab and a quick explanation so
              you don't forget what it is about.
            </p>
          </div>
        </div>
      </section>

      <section className="flex justify-start items-center py-12">
        <div className="w-1/2">
          <div className="max-w-md text-right ml-auto mr-4">
            <h1 className="text-5xl text-blue-400 py-4">
              note what comes to your mind
            </h1>
            <p className="text-3xl">
              Any thought that come to your mind, and you are not sure where it
              belongs, it has a place on ideas tab.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex-center">
          <BrainIcon className="mr-auto w-72 max-w-sm h-auto" />
        </div>
      </section>

      <section className="flex justify-start items-center py-12">
        <div className="w-1/2 flex-center">
          <PaperCraftIcon className="ml-auto w-72 max-w-sm h-auto" />
        </div>
        <div className="w-1/2 ml-4">
          <div className="max-w-md">
            <h1 className="text-5xl text-blue-400 py-4">specify if needed</h1>
            <p className="text-3xl">
              Specify any technology you want to use for your idea
              implementation, or any related link that you may find useful.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FeaturesList;
