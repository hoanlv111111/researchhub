import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../redux/actions/categoryAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const AddPost = ({ setShowModal, selectedUser }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [postID, setPostID] = useState("");

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = {
            postID,
        };
        try {
            const res = await dispatch(createCategory(category, auth.token));
            console.log("create post", res);
            if (res && res.data) {
                console.log(res, res.data);
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { success: "Post added to category" },
                });
                handleCloseModal();
            } else {
                throw new Error("Invalid response");
            }
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.message },
            });
        }
    };

    const handleInputChange = (e) => {
        setPostID(e.target.value);
    };

    return (
        <div className="addPost">
            <form onSubmit={handleSubmit}>
                <h1>Add Post</h1>
                <button onClick={handleCloseModal}>Close</button>
                <input
                    type="text"
                    placeholder="PostId"
                    value={postID}
                    onChange={handleInputChange}
                />
                <div className="form__group">
                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
