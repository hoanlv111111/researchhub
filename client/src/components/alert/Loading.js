import React from 'react'

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100  loading"
            style={{ background: "#0005", color: "white", top: 0, left: 0, zIndex: 50 }}>

            <svg width="205" height="250" viewBox="0 0 40 50">
                <circle cx="20" cy="20" r="20" stroke="#FBCCD2" strokeWidth="1" fill="none" />
                <rect x="3" y="15" width="10" height="10" rx="10" ry="10" stroke="#FBCCD2" strokeWidth="1" fill="none" />
                <rect x="11" y="15" width="10" height="10" rx="10" ry="10" stroke="#FBCCD2" strokeWidth="1" fill="none" />
                <rect x="19" y="15" width="10" height="10" rx="10" ry="10" stroke="#FBCCD2" strokeWidth="1" fill="none" />
                <rect x="27" y="15" width="10" height="10" rx="10" ry="10" stroke="#FBCCD2" strokeWidth="1" fill="none" />
                <text fill="#FBCCD2" x="5" y="47">Loading</text>
            </svg>


        </div>
    )
}

export default Loading