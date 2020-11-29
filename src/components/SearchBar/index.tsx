import React, { FC, FormEvent, useState } from "react";
import { Input, Divider } from "antd";
import styles from "./SearchBar.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Video } from "../../types";
import _, { debounce } from "lodash";

const { Search } = Input;

export interface SearchBarProps {
  onSearch: (g: string) => Promise<Video[]>;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearch = debounce(async (q: string) => {
    setIsLoading(true);
    try {
      await onSearch(q);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    debounceSearch(value);
  };
  return (
    <div className={styles["search-bar"]}>
      <Search
        prefix={<SearchOutlined />}
        placeholder="Type to start searching..."
        className={styles["search-bar__input"]}
        onInput={handleInput}
        loading={isLoading}
        onSearch={debounceSearch}
      />
      <Divider />
    </div>
  );
};
