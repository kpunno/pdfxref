import { useEffect, useRef, useState } from "react";
import { Page } from "react-pdf";

// TODO: Make each component height of device approx.

const LazyPage = ({ pageNumber, onPageChange, /*onPageLoad*/ }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setVisible(true);
            onPageChange(pageNumber - 1);
        } else {
            setVisible(false);
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
        <Page pageNumber={pageNumber} /*onLoadSuccess={onPageChange}*/ />
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default LazyPage;
