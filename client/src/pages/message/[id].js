import React from "react"
import LeftSide from "../../components/message/LeftSide"
import RightSide from "../../components/message/RightSide"
import MessageInfo from "../../components/message/MessInfo"

const Conversation = () => {
    return (
        <div className="message d-flex">
            <div className="col-md-3 border-right px-0 left_mess">
                <LeftSide />
            </div>

            <div className="col-md-6 px-0 right_mess">
                <RightSide />
            </div>
            <div className="col-md-3 border-left">
                <MessageInfo />
            </div>
        </div>
    )
}

export default Conversation
