// render pdf

import "../pdfconfig";

import { useState } from "react";
import { Document, Page } from "react-pdf";

const PDF = ({ url }) => {
  const [pagesCount, setPagesCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onLoad = ({ count }) => {
    setPagesCount(count);
  };

  return (
    <div>
      <Document file={url} onLoadSuccess={onLoad}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {pagesCount}
      </p>
    </div>
  );
};

export default PDF;
