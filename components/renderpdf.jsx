import "../pdfconfig";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useEffect, useRef, useState } from "react";
import { Document } from "react-pdf";
import LazyPage from "./lazypage";

const PDF = ({ url }) => {
  const advancedPagesCount = 5;
  const [renderLength, setRenderLength] = useState(advancedPagesCount);
  const [numPages, setNumPages] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [firstPage, setFirstPage] = useState(1);

  /*
  const [bookmarks, setBookmarks] = useState([]);
  */

  /* TODO: Check for upper bound as well (index <= numPages - 1)
      Only checks lower bound as is (index needs >= zero)
     TODO: Possibly offload array indexing elsewhere
  */
  useEffect(() => {
    // set array dimensions
    // (can't go negative for page index)
    console.log(`Current page is: ${pageIndex + 1}`);
    // page rendering beginning and end index
    let pagesBegin = pageIndex - advancedPagesCount;
    let pagesEnd = pageIndex + advancedPagesCount;
    // check if page index is valid
    const firstIndex = pageIndex - advancedPagesCount;
    if(firstIndex < 0) {
      // if invalid, set begin as 0
      setFirstPage(0);
    } 
    else {
      setFirstPage(pagesBegin);
    }
    
    setRenderLength(pagesEnd - pagesBegin)
  }, [pageIndex]);

  const pageRefs = useRef({});

  // Scroll to current page
  // TODO: Render around the current page
  useEffect(() => {
    const pageRef = pageRefs.current[pageIndex];
    if (pageRef) {
      pageRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pageIndex]);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    console.log(numPages);
  };

  /*
  const onPageLoaded = () => {
    pagesLoadedRef.current += 1;
    if(pagesLoadedRef.current === numPages) {
      console.log("All pages loaded.");
    } else {
      console.log(`Loaded ${pagesLoadedRef.current} of ${numPages}`);
    }
  }
  */

  /*
  const handlePageSearch = ({ target: {value} }) => {
    setPageIndex(value + 1);
  }
  */

  return (
    <div>
      {/* Page Search
      <input type="text" onChange={handlePageSearch} />
      */}

      <Document file={url} onLoadSuccess={onLoadSuccess}>
        {numPages &&
          Array.from({ length: renderLength }, (_, index) => {
            const page = firstPage + index + 1;
            if ( page > numPages ) return null;
            return (
              <LazyPage
                key={page}
                pageNumber={page}
                onPageChange={setPageIndex}
                /*onPageLoad={onPageLoaded}*/
              />
            );
          })};
      </Document>
    </div>
  );
};

export default PDF;
