import React from "react";

const Loader = () => {
  return (
    <div className="sticky top-0 z-50">
      <div className="absolute flex items-center justify-center top-0 bottom-0 w-full h-[100vh] bg-lightBG/50 z-50">
        <div className="bg-white w-20 h-20 rounded-full shadow">
          <div className="lds-ring red">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
