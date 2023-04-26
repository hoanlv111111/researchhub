import React from "react"
import { useSelector, useDispatch } from "react-redux"
import NoNotice from "../images/notice.png"
import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import moment from "moment"
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from "../redux/actions/notifyAction"

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleIsRead = (msg) => {
        dispatch(isReadNotify({ msg, auth }))
    }

    const handleSound = () => {
        dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(item => item.isRead === false)
        if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

        if (window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)) {
            return dispatch(deleteAllNotifies(auth.token))
        }
    }

    return (
        <div style={{ minWidth: "300px" }}>
            <div className="notify d-flex justify-content-between align-items-center px-3">
                <h3>Notification</h3>
                {
                    notify.sound
                        ? <i className="fas fa-bell text-danger"
                            style={{ fontSize: "1.2rem", cursor: "pointer" }}
                            onClick={handleSound} />

                        : <i className="fas fa-bell-slash text-danger"
                            style={{ fontSize: "1.2rem", cursor: "pointer" }}
                            onClick={handleSound} />
                }
            </div>
            <hr className="mt-0" />

            {
                notify.data.length === 0 &&
                <img src={NoNotice} alt="NoNotice" className="w-100" />
            }

            <div className="notify_content">
                {
                    notify.data.map((msg, index) => (
                        <div className="notify_content2" >
                            <Avatar src={msg.user.avatar} size="big-avatar" />
                            <div className="notify_content1">
                                <div key={index} className="notify_content_text" >
                                    {/* add link notify */}
                                    <Link to={`${msg.url}`} className="notify_content_text_link"
                                        onClick={() => handleIsRead(msg)}>
                                        <div className="notify_content_text_bw">
                                            <div>
                                                <strong className="mr-1">{msg.user.username}</strong>
                                                <span style={{ fontSize: "initial" }}>{msg.text}</span>
                                            </div>
                                            {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
                                        </div>
                                    </Link>
                                    {/* add time notification */}
                                    <div className="notify_content_text_time">
                                        {moment(msg.createdAt).fromNow()}
                                    </div>
                                </div>
                                <div className="is_read">
                                    {
                                        !msg.isRead && <i className="fas fa-circle text-primary" />
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

            <hr className="my-1" />
            <div className="text-right text-danger mr-2" style={{ cursor: "pointer" }}
                onClick={handleDeleteAll}>
                Delete All
            </div>

        </div>
    )
}

export default NotifyModal
