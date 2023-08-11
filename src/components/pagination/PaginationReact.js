import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function PaginationComponent(props) {
  const numberOfPages = Math.ceil(props.numberOfArticles / props.articlesPerPage);


  useEffect(() => {
    console.log("Current Page:", props.pageNumber);
  }, [props.pageNumber]);

  const handlePageChange = (event, value) => {
    props.setPageNumber(value);
  };

  return (
    <>
    { props.numberOfArticles > 10 ? 
    
    <div className="container d-flex justify-content-center align-items-center pt-3 pb-3">
      <Stack spacing={0}>
        <Pagination
          count={numberOfPages}
          page={props.pageNumber}
          onChange={handlePageChange}
        />
      </Stack>
    </div> :''
    }
    </>
  );
}
