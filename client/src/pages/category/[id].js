import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";
import PostCard from "../../components/PostCard";

const CategoryPage = () => {
    const { id: categoryId } = useParams();
    const { auth } = useSelector((state) => state);
    const [category, setCategory] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataAPI(`user_categories/${categoryId}`, auth.token);
                const data = res.data;
                setCategory(data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };
        fetchData();
    }, [auth.token, categoryId]);

    const handlePostClick = async (postID) => {
        setSelectedPostId(postID);
        setSelectedPost(null); // reset selected post

        try {
            const res = await getDataAPI(`post/${postID}`, auth.token);
            const data = res.data.post;
            setSelectedPost(data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

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
                            <div>
                                <PostCard post={selectedPost} />
                            </div>
                        ) : (
                            <p>Loading post details...</p>
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
