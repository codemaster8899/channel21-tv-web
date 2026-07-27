import React, { useEffect, useState } from "react";

const Pagination = ({ count = 10, currentPage = 1, setCurrentPage }) => {
  const firstPage = 1;

  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(3);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    if (currentPage < firstPage + 1 || currentPage > count - 1) {
    } else {
      setStartPage(currentPage - 1);
      setEndPage(currentPage + 1);
    }
    let newPages = [...pages];
    for (let i = 1; i <= count; i++) {
      newPages.push(i);
    }
    setPages(newPages);
  }, []);
  useEffect(() => {
    if (currentPage < firstPage + 1 || currentPage > count - 1) {
    } else {
      setStartPage(currentPage - 1);
      setEndPage(currentPage + 1);
    }
  }, [currentPage]);
  return (
    <div>
      <div className="flex transit gap-2">
        <button
          disabled={firstPage === currentPage}
          className={`bg-black/10 dark:bg-white/20 transit block px-2 rounded-md ${
            firstPage === currentPage
              ? "bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-white/10"
              : ""
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {" "}
          {"<"}{" "}
        </button>
        {pages.map((item, index) => {
          if (
            item === firstPage ||
            item === count ||
            (item >= startPage && item <= endPage)
          ) {
            return (
              <div className="w-6 h-6" key={index}>
                <span
                  className={`cursor-pointer block w-full h-full text-center rounded-md ${
                    currentPage == item
                      ? "bg-[url('src/assets/images/Vector.png')] bg-contain bg-no-repeat text-white"
                      : "bg-black/10 dark:bg-white/20"
                  }`}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </span>
              </div>
            );
          }
          if (item > firstPage && item < startPage) {
            if (item == firstPage + 1) {
              return (
                <span key={index} className={`cursor-pointer`}>
                  ...
                </span>
              );
            }
          }
          if (item > endPage && item < count) {
            if (item == count - 1) {
              return (
                <span key={index} className={`cursor-pointer`}>
                  ...
                </span>
              );
            }
          }
        })}
        <button
          disabled={currentPage === count}
          className={`bg-black/10 dark:bg-white/20  block px-2 rounded-md ${
            count === currentPage
              ? "bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-white/10"
              : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {" "}
          {">"}{" "}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
