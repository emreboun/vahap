"use client";
import { useState } from "react";

import { TextField, IconButton, Box } from "@mui/material";
import {
  SearchOutlined as SearchIcon,
  CloseSharp as CloseIcon,
} from "@mui/icons-material";
import { useDebounceWithTimeout } from "@/hooks/debounce";

export const SearchBar = ({ onSearch }: any) => {
  const [searchText, setSearchText] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSearchText(value);
    if (value === "") {
      onSearch("");
    }
  };

  useDebounceWithTimeout(onSearch, searchText, 200);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          width: "100%",
        }}
      >
        <SearchIcon
          style={{
            position: "absolute",
            top: 8,
            left: 11,
            zIndex: 999,
            color: "#335a20",
            opacity: searchFocus || searchText.length > 0 ? 0 : 0.9,
            transition: "opacity 0.25s",
            fontSize: "22px",
          }}
        />

        <TextField
          variant={"outlined"}
          placeholder='Arama'
          value={searchText}
          fullWidth
          sx={{
            bgcolor: "transparent",
            height: "100%",
            "& .MuiInputBase-input": {
              pt: 1,
              pb: 0.9,
              pl: searchFocus || searchText.length > 0 ? 1.4 : "38px",
              transition: "padding 0.25s",
            },
          }}
          autoFocus
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          onChange={handleChange}
        />

        <IconButton
          sx={{
            position: "absolute",
            top: 0, //7.5,
            bottom: 0,
            right: 2,
            borderRadius: 0,
            opacity: searchText.length > 0 ? 0.9 : 0,
            transition: "opacity 0.25s",
            visibility: searchText.length > 0 ? "visible" : "hidden",
            "&:hover": {
              bgcolor: "transparent",
            },
            aspectRatio: 1,
          }}
          onClick={() => handleChange({ target: { value: "" } })}
        >
          <CloseIcon
            style={{
              color: "#335a20",
              fontSize: "20px",
            }}
          />
        </IconButton>
      </Box>
    </>
  );
};
