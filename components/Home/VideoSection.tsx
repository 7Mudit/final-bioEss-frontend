"use client";
import React, { useEffect, useRef, useState } from "react";

const VideoSection = () => {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.7 } // Trigger when 50% of the video is in the viewport
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);
  const videoScale = inView ? 1.2 : 1;
  return (
    <div className="bg-white text-black p-10 md:p-20 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-10">Our Videos</h2>
      {/* <div className="w-full max-w-4xl shadow-lg rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 "> */}
      {/* <div className="w-full">
          <video
            className="w-full"
            src="/banners/video-banner.mp4"
            title="Video 1"
            autoPlay
            muted
          ></video>
        </div> */}
      <div
        ref={videoRef}
        className=" w-[85%] sm:w-[75%] h-full flex items-center justify-center mt-[50px]  transition-all duration-500  overflow-hidden shadow-[10px_-5px_50px_-5px]  dark:bg-white rounded-2xl shadow-blue-700"
        style={{ transform: `scale(${videoScale})` }}
      >
        <div className="videoStylings rounded-xl">
          <video
            className="w-full"
            src="/banners/video-banner.mp4"
            title="Video 1"
            autoPlay
            muted
            loop
          ></video>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default VideoSection;
