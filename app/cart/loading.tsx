import React from "react";

const Loading = () => {
  return (
    <main className=" h-screen flex flex-col gap-5 items-center justify-center">
      <div className="spinner"></div>
      <p className="font-bold text-gray-600">Loading...</p>
    </main>
  );
};

export default Loading;
