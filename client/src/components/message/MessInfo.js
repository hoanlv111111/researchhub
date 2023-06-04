import React, { useEffect, useState } from "react";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../UserCard";

const MessageInfo = () => {
    const [user, setUser] = useState({});
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await getDataAPI("/api/conversations");
                setConversations(res.data.conversations);
            } catch (error) {
                console.error(error);
            }
        };

        fetchConversations();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center flex-column info">
            <i className="fab fa-facebook-messenger mb-3" style={{ fontSize: "4rem" }} />
            <h5>Messenger</h5>
            <small>Keep connected with your friends and family</small>
            <div className="mt-4">
                {conversations.map((conversation) => (
                    <UserCard key={conversation._id} user={conversation.user} />
                ))}
            </div>
        </div>
    );
};

export default MessageInfo;
