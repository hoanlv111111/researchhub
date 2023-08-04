import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory, deleteCategory, getCategories } from "../../redux/actions/categoryAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { CATEGORY_TYPES } from "../../redux/actions/categoryAction";
import CategoryModal from "../CategoryModal";
import { Link } from "react-router-dom";

const CategoryTab = ({ id }) => {
    const { auth } = useSelector((state) => state);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: CATEGORY_TYPES.LOADING, payload: true });
                const res = await dispatch(getCategories({ userID: id, auth }));
                console.log("res categories:", res);
                if (res) {
                    console.log("res.data:", res);
                    setCategories(res);
                }
                dispatch({ type: CATEGORY_TYPES.LOADING, payload: false });
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err.response.data.msg },
                });
            }
        };
        fetchData();
    }, [dispatch, id, auth]);

    useEffect(() => {
        if (showModal) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [showModal, dispatch]);

    const handleSubmitCategory = async (category) => {
        try {
            if (selectedCategoryId) {
                const response = await dispatch(updateCategory(selectedCategoryId, auth.token));
                console.log("update category", response);
                if (response && response.data) {
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Category updated successfully" } });
                    handleCloseModal();
                } else {
                    throw new Error("Invalid response");
                }
            } else {
                const response = await dispatch(createCategory(category, auth.token));
                console.log("create category", response);
                if (response && response.data) {
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Category created successfully" } });
                    handleCloseModal();
                } else {
                    throw new Error("Invalid response");
                }
            }
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg },
            });
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        const confirm = window.confirm("Are you sure you want to delete this category?");
        if (confirm) {
            dispatch(deleteCategory(categoryId, auth.token))
            console.log("delete category", categoryId)
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCategoryId(null);
    };

    return (
        <div className="category-tab">
            <div className="category-tab__header">
                {auth.user?._id === id && (
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Add Category
                    </button>
                )}
            </div>
            {categories.length === 0 ? (
                <p>No categories available</p>
            ) : (
                <div className="category-tab__content">
                    <h3>Categories</h3>
                    {categories.map((category) => (
                        <div className="category-tab__content__item" key={category._id}>
                            <div className="category-tab__content__item__name">
                                <Link to={`/category/${category._id}`}>{category.topic}</Link>
                            </div>
                            <div className="category-tab__content__item__actions">
                                {auth.user?._id === id && (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setSelectedCategoryId(category._id);
                                                setShowModal(true);
                                            }}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteCategory(category._id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <CategoryModal
                    setShowModal={setShowModal}
                    selectedCategory={
                        selectedCategoryId
                            ? categories.find((category) => category._id === selectedCategoryId) || null
                            : null
                    }
                    handleSubmitCategory={handleSubmitCategory}
                />
            )}
        </div>
    );
};

export default CategoryTab;
