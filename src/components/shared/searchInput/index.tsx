import { Box, IconButton, Input, InputAdornment } from "@mui/material";
import search from "../../../assets/images/admin/search.svg";

import "./index.css";

interface SearchInputProps {
  setValue: (value: string) => void;
  value: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ setValue, value, onKeyDown }: SearchInputProps) => {
  return (
    <Input
      placeholder="Search"
      className="searchInput"
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onKeyDown}
      value={value}
      endAdornment={
        <InputAdornment position="start">
          <IconButton>
            <Box
              component="img"
              sx={{
                cursor: "pointer",
                marginRight: "10px",
                height: 20,
                width: 20,
                maxHeight: { xs: 17, md: 17 },
                maxWidth: { xs: 17, md: 17 },
              }}
              alt="search icon"
              src={search}
            />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default SearchInput;
