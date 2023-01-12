import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import RenderedItems from "./RenderedItems";
import PaginationArrow from "./PaginationArrow";

import styles from "./PaginatedItems.module.css";

function PaginatedItems({ itemsPerPage, items, style }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <RenderedItems currentItems={currentItems} />
      <ReactPaginate
        className={`${styles.container} ${style}`}
        breakLabel="..."
        nextLabel={<PaginationArrow isLeft={false} />}
        previousLabel={<PaginationArrow isLeft={true} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        pageClassName={styles.page}
        activeClassName={styles.active}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
