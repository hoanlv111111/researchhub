import React from "react";

export const PdfShow = ({ src, theme }) => {
    const downloadPdf = () => {
        const link = document.createElement("a");
        link.href = src;
        link.download = "researchhub-download.pdf";
        link.click();
    };

    return (
        <div>
            <button onClick={downloadPdf} style={{ border: "1px solid black", borderRadius: "10px" }}>
                <img
                    src={src}
                    alt="PDF Thumbnail"
                    style={{
                        filter: theme ? "invert(1)" : "invert(0)"
                    }}
                />
            </button>
        </div>
    );
};

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