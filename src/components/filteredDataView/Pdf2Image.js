import React from 'react';
import {PDFtoIMG} from 'react-pdf-to-image';
import file from './Brochure.pdf';

const PdfImage = () =>

	<div>
		<PDFtoIMG file={file}>
			{({pages}) => {
				if (!pages.length) return 'Loading...';
				return pages.map((page, index)=>
					<img key={index} src={page}/>
				);
			}}
		</PDFtoIMG>
	</div>

export default PdfImage;