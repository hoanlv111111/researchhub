import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import { imageShow, videoShow, PdfShow } from "../utils/mediaShow";
import BasicDatePicker from "./DatePicker";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const StatusModal = () => {
    const { auth, theme, status, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const currentDate = new Date().toISOString().slice(0, 10);
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [typePost, setTypePost] = useState("Article");
    const [dateOfPublication, setDateOfPublication] = useState(currentDate);
    const [hashtag, setHashtag] = useState("");

    const [stream, setStream] = useState(false);
    const videoRef = useRef();
    const refCanvas = useRef();
    const [tracks, setTracks] = useState("");

    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = [];

        files.forEach((file) => {
            if (!file) return (err = "File does not exist.");

            if (file.size > 1024 * 1024 * 5) {
                return (err = "The image/video largest is 5mb.");
            }

            return newImages.push(file);
        });

        if (err)
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setImages([...images, ...newImages]);
    };

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();

                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width);
        refCanvas.current.setAttribute("height", height);

        const ctx = refCanvas.current.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = refCanvas.current.toDataURL();
        setImages([...images, { camera: URL }]);
    };

    const handleStopStream = () => {
        tracks.stop();
        setStream(false);
    };

    const handleDateChange = (date) => {
        setDateOfPublication(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (status.onEdit) {
            dispatch(
                updatePost({
                    content,
                    images,
                    typePost,
                    dateOfPublication,
                    hashtag,
                    auth,
                    status,
                })
            );
        } else {
            dispatch(
                createPost({
                    content,
                    images,
                    typePost,
                    dateOfPublication,
                    hashtag,
                    auth,
                    socket,
                })
            );
        }

        setContent("");
        setImages([]);
        setTypePost("");
        setHashtag("");
        if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content);
            setImages(status.images);
            setTypePost(status.typePost);
            setDateOfPublication(status.dateOfPublication);
            setHashtag(status.hashtag);
        }
    }, [status]);

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">New Post</h5>
                    <span
                        onClick={() =>
                            dispatch({ type: GLOBALTYPES.STATUS, payload: false })
                        }
                    >
                        &times;
                    </span>
                </div>

                <div className="status_body">
                    <div className="create_post">
                        <form className="create_post_form" onSubmit={handleSubmit}>
                            <div className="title">
                                <h5>Abtract</h5>
                            </div>
                            <Editor
                                value={content}
                                onChange={({ text }) => setContent(text)}
                                renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                            />

                            <div className="create_post_item">
                                <span>Publication type</span>
                                <select
                                    name="type"
                                    id="type"
                                    value={typePost}
                                    onChange={(e) => setTypePost(e.target.value)}
                                >
                                    <option value="Article">Article</option>
                                    <option value="Thesis">Thesis</option>
                                    <option value="Book">Book</option>
                                    <option value="Patent">Patent</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Journal">Journal</option>
                                    <option value="Report">Report</option>
                                    <option value="Preprint">Preprint</option>
                                    <option value="Chapter">Chapter</option>
                                    <option value="Other">Other</option>
                                </select>
                                <span>Date of publication</span>
                                <BasicDatePicker value={dateOfPublication} onChange={handleDateChange} />
                            </div>
                            <div className="create_post_item">
                                <span>Hashtags</span>
                                <input
                                    type="text"
                                    placeholder="e.g: IT, AI, ML"
                                    value={hashtag}
                                    onChange={(e) => setHashtag(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="show_images">
                        {images.map((img, index) => (
                            <div key={index} id="file_img">
                                {img.camera
                                    ? imageShow(img.camera, theme)
                                    : img.url
                                        ? img.url.match(/video/i)
                                            ? videoShow(img.url, theme)
                                            : img.url.match(/pdf/i)
                                                ? PdfShow(img.url, theme)
                                                : imageShow(img.url, theme)
                                        : img.type.match(/video/i)
                                            ? videoShow(URL.createObjectURL(img), theme)
                                            : img.type.match(/pdf/i)
                                                ? PdfShow(URL.createObjectURL(img), theme)
                                                : imageShow(URL.createObjectURL(img), theme)}
                                <span onClick={() => deleteImages(index)}>&times;</span>
                            </div>
                        ))}
                    </div>

                    {
                        stream && (
                            <div className="stream position-relative">
                                <video
                                    autoPlay
                                    muted
                                    ref={videoRef}
                                    width="100%"
                                    height="100%"
                                    style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                                />

                                <span onClick={handleStopStream}>&times;</span>
                                <canvas ref={refCanvas} style={{ display: "none" }} />
                            </div>
                        )
                    }

                    <div className="input_images">
                        {stream ? (
                            <i className="fas fa-camera" onClick={handleCapture} />
                        ) : (
                            <>
                                <i className="fas fa-camera" onClick={handleStream} />

                                <div className="file_upload">
                                    <i className="fas fa-image" />
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleChangeImages}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div >

                <div className="status_footer">
                    <button className="btn btn-secondary w-100" type="submit">
                        Upload
                    </button>
                </div>
            </form >
        </div >
    );
};

export default StatusModal;
