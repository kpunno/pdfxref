import "../pdfconfig";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useEffect, useRef, useState } from "react";
import { Document } from "react-pdf";
import LazyPage from "./lazypage";

const PDF = ({ url }) => {
  const advancedPagesCount = 5;
  const [numPages, setNumPages] = useState(null);
  const [pageIndex, setPageIndex] = useState(4);
  /*
  const [bookmarks, setBookmarks] = useState([]);
  */

  useEffect(() => {
    console.log(`Current page is: ${pageIndex + 1}`);
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
          Array.from({ length: advancedPagesCount }, (_, index) => (
            <LazyPage
              key={index}
              pageNumber={index + 1}
              onPageChange={(i) => setPageIndex(i)}
            />
          ))}
      </Document>
    </div>
  );
};

export default PDF;
