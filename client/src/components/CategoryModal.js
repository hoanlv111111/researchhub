import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory } from "../redux/actions/categoryAction";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const CategoryModal = ({ setShowModal, selectedCategory }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [topic, setTopic] = useState("");
    const [postID, setPostID] = useState("");

    useEffect(() => {
        if (selectedCategory) {
            setTopic(selectedCategory.topic);
            setPostID(selectedCategory.postID);
        } else {
            setTopic("");
            setPostID("");
        }
    }, [selectedCategory]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const category = {
                topic,
                postID
            };

            if (selectedCategory) {
                // Update existing category
                const res = await dispatch(updateCategory(selectedCategory._id, category, auth.token));
                console.log("update category", res);
                if (res && res.data) {
                    dispatch({
                        type: GLOBALTYPES.ALERT,
                        payload: { success: "Category updated successfully" }
                    });
                } else {
                    throw new Error("Invalid response");
                }
            } else {
                // Create new category
                const res = await dispatch(createCategory(category, auth.token));
                console.log("create category", res);
                if (res && res.data) {
                    console.log(res, res.data)
                    dispatch({
                        type: GLOBALTYPES.ALERT,
                        payload: { success: "Category created successfully" }
                    });
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

    return (
        <div className="cate_content">
            <form onSubmit={handleSubmit}>
                <h3 className="cate_title">{selectedCategory ? "Update Category" : "Create Category"}</h3>

                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                <div className="form__group">
                    <label htmlFor="topic">Topic</label>
                    <input
                        type="text"
                        placeholder="Enter category topic"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <label htmlFor="postID">Post ID</label>
                    <input
                        type="text"
                        placeholder="Enter post ID"
                        id="postID"
                        value={postID}
                        onChange={(e) => setPostID(e.target.value)}
                    />
                </div>
                <div className="form__group">
                    <button type="submit" className="btn btn-primary">
                        {selectedCategory ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryModal;
