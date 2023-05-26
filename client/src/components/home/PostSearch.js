import React from "react";
import LoadIcon from "../../images/loading.gif";
import Posts from "./Posts";

const PostSearch = ({ posts, loading, keyword }) => {
    // Check if posts is undefined or null
    if (!posts) {
        return null; // Render nothing if posts is not available
    }

    // Filter posts based on the keyword
    const filteredPosts = posts.filter((post) => {
        if (!post.content) {
            return false; // Ignore posts without content
        }

        const lowerCaseContent = post.content.toLowerCase();
        const lowerCaseKeyword = keyword.toLowerCase();

        return lowerCaseContent.includes(lowerCaseKeyword);
    });

    return (
        <div className="posts">
            {loading ? (
                <img src={LoadIcon} alt="Loading" className="d-block mx-auto" />
            ) : filteredPosts.length === 0 ? (
                <h2>No Post Found</h2>
            ) : (
                filteredPosts.map((post) => (
                    <Posts key={post._id} post={post} />
                ))
            )}
        </div>
    );
};

export default PostSearch;
