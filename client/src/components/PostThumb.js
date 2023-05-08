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
                                post.images && post.images.length > 0 && post.images[0].url
                                    ? (
                                        post.images[0].url.match(/video/i)
                                            ? <video controls src={post.images[0].url} alt={post.images[0].url}
                                                style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
                                            : <img src={post.images[0].url} alt={post.images[0].url}
                                                style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
                                    )
                                    // eslint-disable-next-line jsx-a11y/alt-text
                                    : <img src="https://res.cloudinary.com/diauabgmc/image/upload/v1682387287/img-placeholder_ddtqow.jpg"
                                        // alt="No image or video"
                                        style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
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
