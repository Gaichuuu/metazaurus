import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { PDF_CONTAINER_PADDING } from "../../constants";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      setContainerWidth(container.clientWidth - PDF_CONTAINER_PADDING);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError() {
    setError("Failed to load PDF");
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-zaurus-shell-dark">
        <div className="text-zaurus-error text-center">
          <div className="text-2xl mb-2">⚠</div>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto flex flex-col items-center bg-zaurus-shell-dark py-4 px-4"
    >
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div className="text-zaurus-lcd-light">Loading PDF...</div>}
      >
        {numPages &&
          containerWidth &&
          Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="mb-4 shadow-lg"
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document>
    </div>
  );
}
