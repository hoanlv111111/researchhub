import React, { useState, useEffect } from "react"
import Avatar from "../../Avatar"
import { Link } from "react-router-dom"
import moment from "moment"

import LikeButton from "../../LikeButton"
import { useSelector, useDispatch } from "react-redux"
import CommentMenu from "./CommentMenu"
import { updateComment, likeComment, unLikeComment } from "../../../redux/actions/commentAction"
import InputComment from "../InputComment"

const CommentCard = ({ children, comment, post, commentId }) => {
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState("")
    const [readMore, setReadMore] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)
    const [onReply, setOnReply] = useState(false)

    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if (comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        }
    }, [comment, auth.user._id])

    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({ comment, post, content, auth }))
            setOnEdit(false)
        } else {
            setOnEdit(false)
        }
    }

    const handleLike = async () => {
        if (loadLike) return;
        setIsLike(true)

        setLoadLike(true)
        await dispatch(likeComment({ comment, post, auth }))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if (loadLike) return;
        setIsLike(false)

        setLoadLike(true)
        await dispatch(unLikeComment({ comment, post, auth }))
        setLoadLike(false)
    }

    const handleReply = () => {
        if (onReply) return setOnReply(false)
        setOnReply({ ...comment, commentId })
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "inherit" : "none"
    }

    return (
        <div className="comment_card mt-2" style={styleCard}>
            {/* div 5 */}
            <div className="comment_card-content">
                <div className="avt_cmt">
                    <Link to={comment.user && `/profile/${comment.user._id}`} className="avt_cmt-o text-dark">
                        <Avatar src={comment.user && comment.user.avatar} size="medium-avatar" />
                    </Link>

                </div>
                {/* div 4 */}
                <div className="comment_content3">
                    {/* div 3 */}
                    <div className="comment_content2">
                        {/* div 2 */}
                        <div className="comment_content1">
                            {/* div 1 */}
                            <div className="comment_content-user"
                                style={{
                                    filter: theme ? "invert(1)" : "invert(0)",
                                    color: theme ? "white" : "black",
                                }}
                            >
                                {/* link add to username */}
                                <Link to={`/profile/${comment.user._id}`}>
                                    <h6>{comment.user.username}</h6>
                                </Link>
                                {/* tag user in cmt */}
                                {
                                    onEdit
                                        ? <textarea rows="5" value={content}
                                            onChange={e => setContent(e.target.value)} />
                                        : <div>
                                            {
                                                comment.tag && comment.tag._id !== comment.user._id &&
                                                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                                                    @{comment.tag.username}
                                                </Link>
                                            }
                                            <span>
                                                {
                                                    content.length < 100 ? content :
                                                        readMore ? content + " " : content.slice(0, 100) + "...."
                                                }
                                            </span>
                                            {
                                                content.length > 100 &&
                                                <span className="readMore" onClick={() => setReadMore(!readMore)}>
                                                    {readMore ? "Hide content" : "Read more"}
                                                </span>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="comment_task" style={{ cursor: "pointer" }}>
                            <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
                        </div>
                    </div>

                    <div className="comment_time" style={{ cursor: "pointer" }}>
                        <small className="mr-3">
                            <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                            {comment.likes.length} Likes
                        </small>

                        {
                            onEdit
                                ? <>
                                    <small className="font-weight-bold mr-3"
                                        onClick={handleUpdate}>
                                        Update
                                    </small>
                                    <small className="font-weight-bold mr-3"
                                        onClick={() => setOnEdit(false)}>
                                        Cancel
                                    </small>
                                </>
                                : <small className="mr-3"
                                    onClick={handleReply}>
                                    {onReply ? "Cancel" : "Reply"}
                                </small>
                        }
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>
                    </div>
                </div>
            </div>

            {
                onReply &&
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply} >
                    <Link to={`/profile/${comment.user?._id}`} className="mr-1">
                        @{onReply.user.username}:
                    </Link>
                </InputComment>
            }

            {children}
        </div>
    )
}

export default CommentCard
