import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";
import PostCard from "../../components/PostCard";

const Hashtag = () => {
    const { id: hashtag } = useParams();
    const { auth } = useSelector((state) => state);
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
                        console.log("userData", userData);
                        return { ...post, user: userData.user };
                    })
                );
                console.log("postsWithUser", postsWithUser);
                setPosts(postsWithUser);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchData();
    }, [auth.token, hashtag]);

    return (
        <div className="posts">
            <h1>Hashtag: #{hashtag}</h1>

            <div className="">
                {posts.length === 0 ? (
                    <h2>No Post Found</h2>
                ) : (
                    posts.map((post) => (
                        <>
                            <PostCard key={post._id} post={post} />
                            {console.log("postcard hashtag", post)}
                        </>
                    ))
                )}
            </div>
        </div>
    );
};

export default Hashtag;
