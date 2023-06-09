import React, { useEffect } from "react";
import UserCard from "../UserCard";
import { useSelector } from "react-redux";

const MessInfo = () => {
    const { auth } = useSelector(state => state);
    const { user } = auth;

    return (
        // display infomation of conversation between 2 users (avatar, username, email)
        <div className="px-3">
            <UserCard user={user} />
        </div>

    )
}

export default MessInfo;