export type Video = {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: "youtube#video";
    videoId: string;
  };
};
