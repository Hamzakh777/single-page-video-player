import React, { FC, useState } from "react";
import { SearchBar, VideoCard } from "./components";
import "./App.css";
import { Video } from "./types";
import { API } from "./config";
import { axios } from "./lib";
import _ from 'lodash';
import { message } from "antd";

const App: FC = () => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const showErrorMessage = () => {
    message.error('No video has been found, please try another search query', 4);
  }

  const search = async (query: string): Promise<Video[]> => {
    try {
      const { data } = await axios.get<{ items: Video[] }>(`${API.SEARCH}`, {
        params: {
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          q: query,
          part: "snippet",
        },
      });

      if(_.isNil(data.items[0])) {
        showErrorMessage();
      }
      setCurrentVideo(data.items[0] ?? null);

      return data.items;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="app">
      <SearchBar onSearch={search} />
      <VideoCard video={currentVideo} />
    </div>
  );
};

export default App;
