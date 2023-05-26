import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { follow, unfollow } from "../redux/actions/profileAction"

const FollowBtn = ({ user }) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (auth.user.following.find(item => item._id === user._id)) {
            setFollowed(true)
        }
        return () => setFollowed(false)
    }, [auth.user.following, user._id])

    const handleFollow = async () => {
        if (load) return;

        setFollowed(true)
        setLoad(true)
        await dispatch(follow({ users: profile.users, user, auth, socket }))
        setLoad(false)
    }

    const handleUnFollow = async () => {
        if (load) return;

        setFollowed(false)
        setLoad(true)
        await dispatch(unfollow({ users: profile.users, user, auth, socket }))
        setLoad(false)
    }

    return (
        <div className="follow_btn" style={{
            width: "96px",
            height: "42px",
        }}>
            {
                followed
                    ? <button className="btn btn-outline-danger" style={{ width: "100%" }}
                        onClick={handleUnFollow}>
                        UnFollow
                    </button>
                    : <button className="btn btn-outline-info" style={{ width: "100%" }}
                        onClick={handleFollow}>
                        Follow
                    </button>
            }
        </div>
    )
}

export default FollowBtn
