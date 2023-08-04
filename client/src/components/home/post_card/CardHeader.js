import React from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";
import saveAs from "file-saver";

const CardHeader = ({ post }) => {
    const { auth, socket } = useSelector((state) => state);
    const dispatch = useDispatch();

    const history = useHistory();

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
    };

    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({ post, auth, socket }));
            return history.push("/");
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    };

    const handleDownload = () => {
        if (post.images.length > 0) {
            post.images.forEach((img) => {
                return saveAs(
                    img.url,
                    img.url.replace(`${BASE_URL}/api`, "")
                );
            });
        }
    };

    const formattedDateOfPublication = moment(post.dateOfPublication).format(
        "DD-MM-YYYY"
    );

    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.user.avatar} size="big-avatar" />

                <div className="card_name">
                    <h6 className="m-0">
                        <Link to={`/profile/${post.user._id}`} className="text-dark">
                            {post.user.fullname}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                        {post.updatedAt !== post.createdAt && (
                            <small className="text-muted">
                                (Updated {moment(post.updatedAt).fromNow()})
                            </small>
                        )}
                    </small>
                    <div className="d-flex align-item-center">
                        <small className="text-muted">
                            {post.typePost}
                            <span> | </span>
                            <small className="text-muted">
                                {formattedDateOfPublication}
                            </small>
                        </small>
                    </div>
                </div>
            </div>
            <div className="nav-item dropdown">
                <span
                    className="material-icons"
                    id="moreLink"
                    data-toggle="dropdown"
                >
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {auth.user._id === post.user._id && (
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">create</span> Edit Post
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost}>
                                <span className="material-icons">delete_outline</span> Remove
                                Post
                            </div>
                        </>
                    )}

                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span> Copy Link
                    </div>
                    <div className="dropdown-item" onClick={handleDownload}>
                        <span className="material-icons">file_download</span> Download
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardHeader;