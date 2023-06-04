import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { GLOBALTYPES } from "../redux/actions/globalTypes"
import { createPost, updatePost } from "../redux/actions/postAction"
import Icons from "./Icons"
import { imageShow, videoShow, PdfShow } from "../utils/mediaShow"

const StatusModal = () => {
    const { auth, theme, status, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState("")
    const [images, setImages] = useState([])

    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState("")

    const currentDate = new Date();
    const currentDay = String(currentDate.getUTCDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = currentDate.getUTCFullYear();

    const [day, setDay] = useState(currentDay);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const handleSelectChange = (e, setter, min, max) => {
        const value = e.target.value;
        if (value >= min && value <= max) {
            setter(value);
        }
    };

    const renderOptions = (min, max) => {
        const options = [];
        for (let i = min; i <= max; i++) {
            options.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return options;
    };

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext("2d")
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // if(images.length === 0)
        // return dispatch({ 
        //     type: GLOBALTYPES.ALERT, payload: {error: "Please add your photo."}
        // })

        if (status.onEdit) {
            dispatch(updatePost({ content, images, auth, status }))
        } else {
            dispatch(createPost({ content, images, auth, socket }))
        }


        setContent("")
        setImages([])
        if (tracks) tracks.stop()
        dispatch({ type: GLOBALTYPES.STATUS, payload: false })
    }

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content)
            setImages(status.images)
        }
    }, [status])

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">New Post</h5>
                    <span onClick={() => dispatch({
                        type: GLOBALTYPES.STATUS, payload: false
                    })}>
                        &times;
                    </span>
                </div>

                <div className="status_body">
                    <div className="create_post">
                        <form className="create_post_form" onSubmit={handleSubmit}>
                            <div className="title">
                                <h5>Abtract</h5>
                            </div>
                            <textarea name="content" value={content}
                                placeholder={`${auth.user.username}, what are you thinking?`}
                                onChange={e => setContent(e.target.value)}
                                style={{
                                    filter: theme ? "invert(1)" : "invert(0)",
                                    color: theme ? "white" : "#111",
                                    background: theme ? "rgba(0,0,0,.03)" : "",
                                }} />
                            <div className="d-flex">
                                <div className="flex-fill"></div>
                                <Icons setContent={setContent} content={content} theme={theme} />
                            </div>
                            {/* type */}
                            <div className="create_post_item">
                                <span>Publication type</span>
                                <select name="type" id="type">
                                    <option value="article">Article</option>
                                    <option value="thesis">Thesis</option>
                                    <option value="book">Book</option>
                                    <option value="patent">Patent</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            {/* author */}
                            <div className="create_post_item">
                                <span>Author</span>
                                <input type="text" name="author" id="author" />
                                <div>
                                    <button type="button">Add author</button>
                                    <label><input type="checkbox" value="" />Option 1</label>
                                    <label><input type="checkbox" value="" />Option 2</label>
                                    <label><input type="checkbox" value="" />Option 3</label>
                                </div>
                            </div>
                            {/* date */}
                            <div className="create_post_item">
                                <span>Publication date</span>
                                <div>
                                    <select
                                        name="day"
                                        id="day"
                                        value={day}
                                        onChange={(e) => handleSelectChange(e, setDay, 1, 31)}
                                    >
                                        {renderOptions(1, 31)}
                                    </select>
                                    <select
                                        name="month"
                                        id="month"
                                        value={month}
                                        onChange={(e) => handleSelectChange(e, setMonth, 1, 12)}
                                    >
                                        {renderOptions(1, 12)}
                                    </select>
                                    <select
                                        name="year"
                                        id="year"
                                        value={year}
                                        onChange={(e) => handleSelectChange(e, setYear, 1940, 2100)}
                                    >
                                        {renderOptions(1940, 2100)}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="show_images">
                        {images.map((img, index) => (
                            <div key={index} id="file_img">
                                {img.camera ? imageShow(img.camera, theme) : (
                                    img.url ? (
                                        img.url.match(/video/i) ? videoShow(img.url, theme) :
                                            img.url.match(/pdf/i) ? PdfShow(img.url, theme) :
                                                imageShow(img.url, theme)
                                    ) : (
                                        img.type.match(/video/i) ? videoShow(URL.createObjectURL(img), theme) :
                                            img.type.match(/pdf/i) ? PdfShow(URL.createObjectURL(img), theme) :
                                                imageShow(URL.createObjectURL(img), theme)
                                    )
                                )}
                                <span onClick={() => deleteImages(index)}>&times;</span>
                            </div>
                        ))}
                    </div>

                    {
                        stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{ filter: theme ? "invert(1)" : "invert(0)" }} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{ display: "none" }} />
                        </div>
                    }

                    <div className="input_images">
                        {
                            stream
                                ? <i className="fas fa-camera" onClick={handleCapture} />
                                : <>
                                    <i className="fas fa-camera" onClick={handleStream} />

                                    <div className="file_upload">
                                        <i className="fas fa-image" />
                                        <input type="file" name="file" id="file"
                                            multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    </div>
                                </>
                        }
                    </div>
                </div>

                <div className="status_footer">
                    <button className="btn btn-secondary w-100" type="submit">
                        Upload
                    </button>
                </div>

            </form>
        </div>
    )
}

export default StatusModal
