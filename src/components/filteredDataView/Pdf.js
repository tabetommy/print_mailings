import React, { useState,useEffect } from 'react';
import { Document, Page,pdfjs, PageCanvas } from 'react-pdf';
import './filteredDataView';

  
export default function Test(props) {//props recieved from filtereddataView
	//pdf.worker.js is needed to work  
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	 const [numPages, setNumPages] = useState(null);
	  const [pageNumber, setPageNumber] = useState(1);
	  
  
	/*function onDocumentLoadSuccess({ numPages }) {
	setNumPages(numPages);
	setPageNumber(1);
  }*/
   
   const PDFDocumentWrapper = styled.div`
	 canvas {
	   width: 100% !important;
	   height: auto !important;
	 }
   `;
  
  return (
	<PDFDocumentWrapper>
	  <Document
		file={props.pdfUrl}
		>
		<Page 
		pageNumber={pageNumber} 
		renderTextLayer={false}
		renderAnnotationLayer={false}
		/>
		
	  </Document>
	</PDFDocumentWrapper>
  );
}