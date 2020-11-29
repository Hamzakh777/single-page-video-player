import React, { FC, useEffect, useState } from "react";
import { SearchBar } from "./components";
import "./App.css";
import { Video } from "./types";
import { API } from "./config";
import { axios } from "./lib";

const App: FC = () => {
  
  const search = async (query: string): Promise<Video[]> => {
    try {
      const { data } = await axios.get<{ items: Video[] }>(`${API.SEARCH}`, {
        params: {
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          q: query
        },
      });

      return data.items;
    } catch (error) {
      throw new Error(error);
    }
  };


  useEffect(() => {
    search('test');
  }, [])
  return (
    <div className="app">
      <SearchBar onSearch={search}/>
    </div>
  );
};

export default App;
