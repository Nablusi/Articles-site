import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ProfilePagination(props) {
  const handlePageChange = (event, value) => {
    props.setPageNumber(value);
  }

  return (
    <Stack spacing={0}>
      <Pagination
        count={props.numberOfPages}
        page={props.pageNumber}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
}
