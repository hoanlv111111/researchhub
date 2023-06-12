// import React, { useEffect } from "react";
// import UserCard from "../UserCard";
// import { useSelector } from "react-redux";

// const MessInfo = () => {
//     const { auth, message, theme } = useSelector((state) => state);
//     const { data } = message;

//     useEffect(() => {
//         const newData = data.filter((item) => item.sender !== auth.user._id)[0];
//         if (newData) {
//             console.log(newData);
//         }
//     }, [data, auth.user._id]);

//     if (!data.length) return null;

//     const user = data.filter((item) => item.sender !== auth.user._id)[0];

//     return (
//         <div className="px-3">
//             {user && (
//                 <>
//                     <div className="info">
//                         <UserCard user={user} />
//                         <div className="user-info">
//                             <h4>{user.username}</h4>
//                             <span>{user.email}</span>
//                         </div>
//                     </div>
//                     <div className="conversation-info">
//                         {/* Display additional conversation information here */}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MessInfo;
