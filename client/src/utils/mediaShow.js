export const PdfShow = ({ src, theme }) => {
    return (
        <div>
            <img src={src} alt="PDF Thumbnail"
                style={{ filter: theme ? "invert(1)" : "invert(0)", border: "1px solid black", borderRadius: "10px" }} />
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