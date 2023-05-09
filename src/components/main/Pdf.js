import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import './main.css';


//PDFjs worker from an external cdn
const url = "http://localhost:5000/image/1683198360946.pdf"
  
export default function Test() {
	  
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	 const [numPages, setNumPages] = useState(null);
	  const [pageNumber, setPageNumber] = useState(1);
  
	function onDocumentLoadSuccess({ numPages }) {
	setNumPages(numPages);
	setPageNumber(1);
  }
  return (
	<>
	<div className="main">
	  <Document
		file={url}
		onLoadSuccess={onDocumentLoadSuccess}
		>
		<Page 
		pageNumber={pageNumber} 
		renderTextLayer={false}
		renderAnnotationLayer={false}
		/>
	  </Document>
	 </div>
	</>
  );
}