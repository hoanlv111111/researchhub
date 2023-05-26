import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createComment } from "../../redux/actions/commentAction"
import Icons from "../Icons"
import { Link } from "react-router-dom"
import Avatar from "../Avatar"

const InputComment = ({ children, post, onReply, setOnReply }) => {
    const [content, setContent] = useState("")

    const { auth, socket, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!content.trim()) {
            if (setOnReply) return setOnReply(false);
            return;
        }

        setContent("")

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }

        dispatch(createComment({ post, newComment, auth, socket }))

        if (setOnReply) return setOnReply(false);
    }

    return (
        <div className="comment_input_all"
            style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
                padding: "8px 15px",
                flexDirection: "row",
            }}>
            <Avatar src={auth.user.avatar} size="medium-avatar" />
            <form className=" comment_input" onSubmit={handleSubmit}>
                <Link to={`/profile/${auth.user._id}`}></Link>
                {children}

                <div style={{
                    position: 'relative',
                    display: 'flex',
                    // justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                }}>
                    <input
                        type="text"
                        placeholder="Add your comments..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        style={{
                            filter: theme ? "invert(1)" : "invert(0)",
                            color: theme ? "white" : "black",
                            background: theme ? "rgba(0,0,0,.03)" : "",
                            border: theme ? "1px solid black" : "1px solid white",
                        }}
                    />
                    <Icons setContent={setContent} content={content} theme={theme} />
                </div>

            </form>
            <button type="submit" className="postBtn">
                <i className="far fa-paper-plane" aria-hidden="true"></i>
            </button>
        </div>
    )
}

export default InputComment
