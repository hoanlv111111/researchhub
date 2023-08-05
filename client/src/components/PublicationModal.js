import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPublication, updatePublication } from "../redux/actions/publicationAction";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import BasicDatePicker from "./DatePicker";
import moment from "moment";

const PublicationModal = ({ setShowModal, selectedPublication }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const formattedDate = moment(new Date().toISOString().slice(0, 10)).format("DD-MM-YYYY");
    const [title, setTitle] = useState("");
    const [citation, setCitation] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [conference, setConference] = useState("");
    const [pages, setPages] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState(formattedDate);

    useEffect(() => {
        if (selectedPublication) {
            setTitle(selectedPublication.title);
            setCitation(selectedPublication.citation);
            setDescription(selectedPublication.description);
            setAuthor(selectedPublication.author);
            setConference(selectedPublication.conference);
            setPages(selectedPublication.pages);
            setPublisher(selectedPublication.publisher);
            setYear(selectedPublication.year);
        } else {
            setTitle("");
            setCitation("");
            setDescription("");
            setAuthor("");
            setConference("");
            setPages("");
            setPublisher("");
            setYear(formattedDate);
        }
    }, [selectedPublication, formattedDate]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPublication = {
                title,
                citation,
                conference,
                pages,
                publisher,
                description,
                author,
                year,
            };

            if (selectedPublication) {
                console.log("selectedPublication._id:", selectedPublication._id);
                console.log("newPublication:", newPublication);
                console.log("auth.token:", auth.token);
                dispatch(updatePublication(selectedPublication._id, newPublication, auth.token));
                console.log(selectedPublication._id)
                dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Publication updated successfully" } });
            } else {
                dispatch(createPublication(newPublication, auth.token));
                dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Publication created successfully" } });
            }
        } catch (err) {
            console.log("err", err)
            // dispatch({
            //     type: GLOBALTYPES.ALERT,
            //     payload: { error: err.message },
            // });
        }
    };

    return (
        <div className="pub_content">
            <form onSubmit={handleSubmit}>
                <h5 className="title">{selectedPublication ? "Edit Publication" : "Add Publication"}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="citation" className="form-label">
                        Citation
                    </label>
                    <input
                        className="form-control"
                        id="citation"
                        value={citation}
                        onChange={(e) => setCitation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">
                        Authors
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="conference" className="form-label">
                        Conference
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="conference"
                        value={conference}
                        onChange={(e) => setConference(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">
                        Publisher
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pages" className="form-label">
                        Pages
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="pages"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">
                        Year
                    </label>
                    <BasicDatePicker value={year} onChange={(date) => setYear(date)} />
                </div>
                <button className="btn btn-secondary w-100" type="submit">{selectedPublication ? "Update" : "Submit"}</button>
            </form>
        </div>
    );
};

export default PublicationModal;
