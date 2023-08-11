import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";
import PostCard from "../../components/PostCard";
import LoadIcon from "../../images/loading.gif";

const CategoryPage = () => {
    const { id: categoryId } = useParams();
    const { auth } = useSelector((state) => state);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getDataAPI(`user_categories/${categoryId}`, auth.token);
                const data = res.data;
                setCategory(data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, [auth.token, categoryId]);

    const handlePostClick = async (postID) => {
        setSelectedPostId(postID);
        setSelectedPost(null); // Reset selected post

        try {
            const res = await getDataAPI(`post/${postID}`, auth.token);
            const data = res.data.post;
            setSelectedPost(data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            </div>
        );
    }

    if (!category) {
        return <h2>No Category Found</h2>;
    }

    return (
        <div className="category">
            <div className="col-md-4">
                <h3>{category.topic}</h3>
                <div className="">
                    <ul>
                        {category.postID.map((postID) => (
                            <li
                                key={postID}
                                onClick={() => handlePostClick(postID)}
                                className={`category__link ${postID === selectedPostId ? 'active' : ''}`}
                            >
                                {postID}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-md-8">
                {selectedPostId ? (
                    <div className="posts">
                        <h4>Post Details</h4>
                        {selectedPost ? (
                            <PostCard post={selectedPost} />
                        ) : (
                            <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                        )}
                    </div>
                ) : (
                    <p>Select a post to view details</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
