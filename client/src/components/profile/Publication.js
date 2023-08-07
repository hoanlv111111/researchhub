import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublications, deletePublication } from "../../redux/actions/publicationAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { PUBLICATION_TYPES } from "../../redux/actions/publicationAction";
import PublicationModal from "../PublicationModal";
import { Link } from "react-router-dom";
import moment from "moment";

const PublicationTab = ({ id, theme }) => {
    const { auth } = useSelector((state) => state);
    const [publications, setPublications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPublicationId, setSelectedPublicationId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: PUBLICATION_TYPES.LOADING_PUBLICATION, payload: true });
                const res = await dispatch(getPublications({ userId: id, auth }));
                console.log("res publications:", res);
                if (res) {
                    console.log("res.data:", res);
                    setPublications(res);
                }
                dispatch({ type: PUBLICATION_TYPES.LOADING_PUBLICATION, payload: false });
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err.response.data.msg },
                });
            }
        };
        fetchData();
    }, [id, dispatch, auth]);

    useEffect(() => {
        if (showModal) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [showModal, dispatch]);

    const handleDeletePublication = (publicationId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this publication?");
        if (confirmDelete) {
            dispatch(deletePublication(publicationId, auth.token));
            console.log("delete publication:", publicationId);
        }
    };

    return (
        <div className="pub_tab" style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}>
            {auth.user._id === id && (
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Add Publication
                </button>
            )}

            <h2>List of Publications:</h2>
            {publications.length > 0 ? (
                <table id="table">
                    <thead>
                        <tr>
                            <th style={{ width: "70%" }}>Title</th>
                            <th style={{ width: "10%" }}>Cited by</th>
                            <th style={{ width: "10%" }}>Year</th>
                            {auth.user._id === id && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {publications.map((publication) => (
                            <tr key={publication._id}>
                                <td>
                                    <Link to={`/publication/${publication._id}`}>
                                        {publication.title}
                                    </Link>
                                </td>
                                <td>{publication.citation}</td>
                                <td>{moment(publication.year).format("YYYY")}</td>
                                {auth.user._id === id && (
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setSelectedPublicationId(publication._id);
                                                setShowModal(true);
                                            }}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeletePublication(publication._id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No publications available</p>
            )}
            {showModal && (
                <PublicationModal
                    setShowModal={setShowModal}
                    selectedPublication={
                        selectedPublicationId
                            ? publications.find((pub) => pub._id === selectedPublicationId) || null
                            : null
                    }
                />
            )}
        </div>
    );
};

export default PublicationTab;
