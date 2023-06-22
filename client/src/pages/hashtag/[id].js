import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostByHashtag } from "../../redux/actions/postAction";
import Posts from "../../components/home/Posts";
import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard";
import ReactMarkdown from "react-markdown";

const Hashtag = () => {
    const { id: hashtag } = useParams();
    const { auth } = useSelector(state => state);

    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostByHashtag(hashtag, auth.token));
    }, [dispatch, hashtag, auth.token]);

    if (!posts || posts.length === 0) {
        console.log("No posts found.", posts);
        return <div>Hashtag: {hashtag} No posts found.</div>;
    }

    return (
        <div>
            <h1>Hashtag id: #{hashtag}</h1>
            <div className="posts abc">
                {posts.length === 0 ? (
                    <h2>No Post Found</h2>
                ) : (
                    posts.map((post) => (
                        <Link to={`/post/${post._id}`} key={post._id}>
                            <div key={post._id}>
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                                <p>Author: <UserCard user={post.user} /></p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Hashtag;
