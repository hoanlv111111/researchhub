// import React, { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// export const PdfShow = ({ src }) => {
//     const [numPages, setNumPages] = useState(null);
//     const [thumbnail, setThumbnail] = useState(null);

//     useEffect(() => {
//         // Load the PDF document
//         pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//         pdfjs.getDocument(src).promise.then((pdf) => {
//             // Fetch the first page of the PDF as an image
//             pdf.getPage(1).then((page) => {
//                 const canvas = document.createElement('canvas');
//                 const context = canvas.getContext('2d');
//                 const viewport = page.getViewport({ scale: 0.5 });
//                 canvas.width = viewport.width;
//                 canvas.height = viewport.height;
//                 page.render({ canvasContext: context, viewport }).promise.then(() => {
//                     // Convert the canvas image to data URL
//                     const dataUrl = canvas.toDataURL();
//                     setThumbnail(dataUrl);
//                 });
//             });
//             setNumPages(pdf.numPages);
//         });
//     }, [src]);

//     return (
//         <div>
//             <img src={thumbnail} alt="PDF Thumbnail" />
//             <p>Page 1 of {numPages}</p>
//         </div>
//     );
// };

export const PdfShow = ({ src }) => {
    return (
        <iframe src={src} width="100%" height="100%" />
    )
}

export const imageShow = (src, theme) => {
    return (
        <img src={src} alt="images" className="img-thumbnail"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
    )
}

export const videoShow = (src, theme) => {
    return (
        <video controls src={src} alt="images" className="img-thumbnail"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
    )
}