import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";
import PostCard from "../../components/PostCard";
import LoadIcon from "../../images/loading.gif";

const Hashtag = () => {
    const { id: hashtag } = useParams();
    const { auth } = useSelector((state) => state);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataAPI(`hashtag/${hashtag}`, auth.token);
                const data = res.data.posts;
                const postsWithUser = await Promise.all(
                    data.map(async (post) => {
                        const userRes = await getDataAPI(`user/${post.user}`, auth.token);
                        const userData = userRes.data;
                        return { ...post, user: userData.user };
                    })
                );
                setPosts(postsWithUser);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [auth.token, hashtag]);

    return (
        <div className="posts">
            <h1>Hashtag: #{hashtag}</h1>

            <div className="">
                {loading ? (
                    <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                ) : posts.length === 0 ? (
                    <h2>No Post Found</h2>
                ) : (
                    posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Hashtag;
