import React, { useState } from "react";
import Carousel from "../../Carousel";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const CardBody = ({ post, theme }) => {
    const [readMore, setReadMore] = useState(false);

    const renderedContent = <ReactMarkdown>{post.content}</ReactMarkdown>;

    return (
        <div className="card_body">
            <div
                className="card_body-content"
                style={{
                    filter: theme ? "invert(1)" : "invert(0)",
                    color: theme ? "white" : "black",
                }}
            >
                {renderedContent}
                {post.content.length > 200 && (
                    <span className="readMore" onClick={() => setReadMore(!readMore)}>
                        {readMore ? "Hide content" : "Read more"}
                    </span>
                )}
                {post.hashtag && post.hashtag.length > 0 && post.hashtag[0] !== "" && (
                    <div className="hashtags">
                        {post.hashtag.map((hashtag, index) => (
                            <Link
                                key={index}
                                className="hashtag"
                                to={`/hashtag/${hashtag}`}
                            >
                                #{hashtag}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            {post.images.length > 0 && <Carousel images={post.images} id={post._id} />}
        </div>
    );
};

export default CardBody;
