import { FunctionComponent } from "react";

const NotFound: FunctionComponent = () => {
  return (
    <div className="wrapper w-full h-full text-gray-900 flex-center">
      <div className="container w-80 text-center">
        <div className="paper w-3/4 h-40 bg-gray-50 mx-auto rounded-t">
          <div className="animate-pulse text-4xl tracking-widest py-2 ">
            404
          </div>
          <div className="px-4">
            The page you are looking for, does NOT exists
          </div>
        </div>
        <div className="printer relative w-full h-32 bg-gray-800 border-t-8 border-blue-400 rounded-t-md">
          <div className="absolute top-4 left-7 w-4 h-4 bg-gray-200 rounded-full"></div>
          <div className="absolute shadow-2xl w-5/6 h-4 rounded border-2 border-white-200 bottom-8 left-7"></div>
        </div>
        <div className="footer w-full h-2 bg-gray-50 shadow-xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
