import React, { FC } from "react";
import { Video } from "../../types";
import ReactPlayer from "react-player";
import { isNil } from "lodash";
import { Empty } from "antd";
import styles from "./VideoPlayer.module.css";

export interface VideoCardProps {
  video?: Video | null;
}

export const VideoCard: FC<VideoCardProps> = ({ video = null }) => {
  return (
    <div>
      {isNil(video) ? (
        <Empty description={<span>No video to play</span>} />
      ) : (
        <div>
          <ReactPlayer
            width="100%"
            height="500px"
            url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
          />
          <div className={styles["video-info"]}>
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.description}</p>
            <a
              href={`https://www.youtube.com/channel/${video.snippet.channelId}`}
              target="_blank"
              rel="noreferrer"
            >
              {video.snippet.channelTitle}
            </a>
          </div>
        </div>
      )}
      {/* video info */}
    </div>
  );
};
