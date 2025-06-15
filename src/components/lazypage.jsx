import { useEffect, useRef, useState } from "react";
import { Page } from "react-pdf";

// TODO: Make each component height of device approx.

const LazyPage = ({ pageNumber, bufferPages, bufferSize }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  const onPageChange = () => {
    if (pageNumber % bufferSize === 0) {
      bufferPages(pageNumber);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setVisible(true);
            onPageChange();
        } else {
            setVisible(false)
        }
      },
      {
        // rootMargin: "50px",
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div id={`p${pageNumber}`} ref={ref} style={{ minHeight: "100vh", marginBottom: "2px" }}>
      {visible ? (
        <Page pageNumber={pageNumber}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LazyPage;
