import { useEffect, useState } from "react";

const useCarouselNavigation = (numOfPages) => {
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(nextPage, 10000)

    return () => {
      clearTimeout(timeout);
    }
  }, [pageNum]);

  const nextPage = () => {
    if (pageNum >= numOfPages - 1) {
      setPageNum(0);
      return;
    }
    setPageNum((prevPageNum) => prevPageNum + 1);
  };

  const prevPage = () => {
    if (pageNum === 0) {
      setPageNum(numOfPages - 1);
      return;
    }
    setPageNum((prevPageNum) => prevPageNum - 1);
  };

  return { pageNum, nextPage, prevPage };
};

export default useCarouselNavigation;
