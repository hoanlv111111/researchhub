import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Posts from "../../components/home/Posts";
import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard";
import ReactMarkdown from "react-markdown";
import { getDataAPI } from "../../utils/fetchData";
import PostCard from "../../components/PostCard";

const Hashtag = () => {
    const { id: hashtag } = useParams();
    const { auth } = useSelector((state) => state);
    const [check, setCheck] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataAPI(`hashtag/${hashtag}`, auth.token);
            const data = res.data.posts;
            setCheck(data)
            console.log("data", data)
        }
        fetchData();
    }, [1])

    return (
        <div className="posts">
            <h1>Hashtag id: #{hashtag}</h1>
            <div className="">
                {check.length === 0 ? (
                    <h2>No Post Found</h2>
                ) : (
                    check.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Hashtag;
