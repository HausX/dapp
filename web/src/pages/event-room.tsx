import Layout from "../components/Layout";
import { useState } from "react";
import Video from "../components/Video";
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import RelayerKitDemo from "@/components/RelayerKit";
import Chat from "@/components/Chat";
interface ChatMessage {
  user: string;
  message: string;
}

export default function EventRoom() {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "http://localhost:8080/mystream.m3u8", // HLS URL
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <Layout>
      <main
        className={`w-full min-h-screen flex-col items-center justify-between mt-24 px-24`}
      >
        <div className="flex flex-col lg:flex-row justify-center items-start p-4">
          {/* Left Section - Video Player */}
          <div className="lg:w-3/4 mr-4 mb-4 lg:mb-0">
            {/* Insert your video player component here */}
            <Video options={videoJsOptions} />
            {/* Video Details */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Event Name</h2>
              <div className="flex mt-2">
                <span className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs mr-2">
                  Label 1
                </span>
                <span className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs">
                  Label 2
                </span>
                {/* Add more labels as needed */}
              </div>
            </div>
          </div>

          {/* Right Section - Chat Room and Leaderboard */}
          <div className="lg:w-1/3 flex flex-col">
            {/* Chat Room */}

            <Chat />

            {/* <RelayerKitDemo /> */}

            <div className="bg-zinc-800 rounded-lg shadow p-4 mb-4">
              {/* Insert your chat component here */}
              {/* Quick Tip Options */}
              <h2 className="text-zinc-500  mt-2 ml-2">Quick Tip</h2>
              <div className="flex justify-between text-sm w-full">
                <button className="bg-zinc-900 hover:bg-zinc-600 text-white px-4 py-2 rounded-2xl m-1">
                  0.01 ETH
                </button>
                <button className="bg-zinc-900 hover:bg-zinc-600 text-white px-4 py-2 rounded-2xl m-1">
                  0.1 ETH
                </button>
                <button className="bg-zinc-900 hover:bg-zinc-600 text-white px-4 py-2 rounded-2xl m-1">
                  0.5 ETH
                </button>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-zinc-800 rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
              {/* Display highest tipper and other leaderboard information */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-200">Highest Tipper: User123</span>
                <span className="bg-zinc-700 text-white px-2 py-1 rounded">
                  $50
                </span>
              </div>
              {/* Add more leaderboard entries as needed */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
