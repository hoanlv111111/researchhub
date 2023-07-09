import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublications, createPublication, updatePublication, deletePublication } from "../../redux/actions/publicationAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { PUBLICATION_TYPES } from "../../redux/actions/publicationAction";
import PublicationModal from "../PublicationModal";
import { Link } from "react-router-dom";
import moment from "moment";

const PublicationTab = ({ id }) => {
    const { auth } = useSelector((state) => state);
    const [publications, setPublications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPublicationId, setSelectedPublicationId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: PUBLICATION_TYPES.LOADING, payload: true });
                const res = await dispatch(getPublications({ id: auth.user._id, auth }));
                console.log("res publications:", res);
                if (res) {
                    console.log("res.data:", res);
                    setPublications(res);
                }
                dispatch({ type: PUBLICATION_TYPES.LOADING, payload: false });
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err.response.data.msg },
                });
            }
        };
        fetchData();
    }, [dispatch, auth]);

    useEffect(() => {
        if (showModal) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [showModal, dispatch]);

    const handleSubmitPublication = async (newPublication) => {
        try {
            if (selectedPublicationId) {
                const response = await dispatch(updatePublication(selectedPublicationId, newPublication, auth.token));
                console.log("update publication", response);
                if (response && response.data) {
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Publication updated successfully" } });
                    handleCloseModal();
                } else {
                    throw new Error("Invalid response");
                }
            } else {
                const response = await dispatch(createPublication(newPublication, auth.token));
                console.log("create publication", response);
                if (response && response.data) {
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Publication created successfully" } });
                    handleCloseModal();
                } else {
                    throw new Error("Invalid response");
                }
            }
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.message },
            });
        }
    };

    const handleDeletePublication = (publicationId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this publication?");
        if (confirmDelete) {
            dispatch(deletePublication(publicationId, auth.token));
            console.log("delete publication:", publicationId);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPublicationId(null);
    };

    return (
        <div className="pub_tab">
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
                    handleSubmitPublication={handleSubmitPublication}
                />
            )}
        </div>
    );
};

export default PublicationTab;
