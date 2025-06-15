import "../../pdfconfig";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Document, Page } from "react-pdf";
import { FixedSizeList as List } from "react-window";
import { useState } from "react";

const PDF = ({ file }) => {
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const Row = ({ index, style }) => (
    <div style={style}>
      <Page
        pageNumber={index + 1}
        renderAnnotationLayer
        renderTextLayer={false}
        scale={1.2}
      />
    </div>
  );

  return (
    <Document file={file} onLoadSuccess={onLoadSuccess}>
      {numPages && (
        <List
          height={window.innerHeight}
          itemCount={numPages}
          itemSize={window.innerHeight * 1.2}
          width={"100%"}
        >
          {Row}
        </List>
      )}
    </Document>
  );
};

export default PDF;