import React from "react";

// MUI imports
import { useTheme, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
    onChange?: (event: React.BaseSyntheticEvent) => void;
    value?: string;
    placeholder?: string;
    inputIcon?: React.ReactNode;
    size?: {
        width?: string;
        height?: string;
    };
    params?: any;
}

function SearchBar({
    onChange,
    value,
    placeholder = "Search",
    inputIcon,
    size = {
        width: "100%",
        height: "100%",
    },
    params,
}: SearchBarProps) {
    const theme = useTheme();

    return (
        <TextField
            sx={{
                "& .MuiOutlinedInput-root": {
                    width: size.width,
                    height: size.height,
                    backgroundColor: theme.menu.selectedHover,
                    color: theme.text.main,
                    fontFamily: theme.font.styled.family,
                    fontWeight: theme.font.styled.weight,
                    borderRadius: "5px",
                    "& fieldset, &:hover fieldset, &:focus, &.Mui-focused fieldset":
                        { border: 0 },
                },
            }}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            fullWidth
            autoComplete="off"
            slotProps={
                !params
                    ? {
                          input: {
                              startAdornment: (
                                  <InputAdornment
                                      position="start"
                                      sx={{ color: theme.text.main }}
                                  >
                                      {inputIcon || <SearchIcon />}
                                  </InputAdornment>
                              ),
                          },
                      }
                    : {}
            }
            {...params}
        />
    );
}

export default SearchBar;
