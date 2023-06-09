/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const PostThumb = ({ posts, result }) => {
    const { theme } = useSelector(state => state)

    if (result === 0) return <h2 className="nopost">No Post</h2>

    return (
        <div className="post_thumb">
            {
                posts.map(post => (
                    <Link key={post._id} to={`/post/${post._id}`}>
                        <div className="post_thumb_display">
                            {
                                post.images && post.images.length > 0 && post.images[0].url ? (
                                    post.images[0].url.match(/video/i) ? (
                                        <video
                                            controls
                                            src={post.images[0].url}
                                            alt={post.images[0].url}
                                            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                                        />
                                    ) : post.images[0].url.match(/\.pdf$/i) ? (
                                        <div>
                                            <iframe
                                                src={post.images[0].url}
                                                width="100%"
                                                height="500px"
                                                title={`PDF File ${post._id}`}
                                                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={post.images[0].url}
                                            alt={post.images[0].url}
                                            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                                        />
                                    )
                                ) : (
                                    <img
                                        src="https://res.cloudinary.com/diauabgmc/image/upload/v1686151999/img_148071_w5e4da-Thumbnail_i4zca8.png"
                                        alt="No image or video"
                                        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                                    />
                                )
                            }


                            <div className="post_thumb_menu">
                                <i class="fas fa-heart">{post.likes.length}</i>
                                <i class="fas fa-comment-alt">{post.comments.length}</i>
                            </div>
                        </div>
                        <div className="post_content">
                            {/* Render the content of the post */}
                            {post.content}
                        </div>
                    </Link>
                ))
            }
        </div>

    )
}

export default PostThumb
