"use client";

import {
  TextField,
  Button,
  Stack,
} from "@mui/material";

interface Props {
  search: string;
  setSearch: any;
  onSearch?: (keyword: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
  onSearch,
}: Props) {
  const handleSubmit = () => {
    if (onSearch) onSearch(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      mb={3}
    >
      <TextField
        fullWidth
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Search
      </Button>
    </Stack>
  );
}