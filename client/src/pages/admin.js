import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataAPI } from "../utils/fetchData";
import AdminModal from "../components/AdminModal";
import Chart from "chart.js";

const AdminPage = () => {
    const { auth } = useSelector((state) => state);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sortBy, setSortBy] = useState("username");
    const [sortOrder, setSortOrder] = useState("asc");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataAPI("users", auth.token);
                const user = res.data.users;
                setUsers(user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchData();
    }, [auth.token]);

    useEffect(() => {
        const fetchDataPost = async () => {
            try {
                if (selectedUser) {
                    const res = await getDataAPI(
                        `user_posts/${selectedUser._id}`,
                        auth.token
                    );
                    const data = res.data.posts;
                    console.log("Data posts cua user", data)
                    setPosts(data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchDataPost();
    }, [auth.token, selectedUser, selectedUser?._id]);

    const openUserPosts = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const formatDate = (dateString) => {
        const options = { month: "short", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder((prevSortOrder) =>
                prevSortOrder === "asc" ? "desc" : "asc"
            );
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    const sortedUsers = users.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    useEffect(() => {
        const userStats = {
            labels: [],
            data: [],
        };

        sortedUsers.forEach((user) => {
            const monthYear = formatDate(user.createdAt);
            if (userStats.labels.includes(monthYear)) {
                const index = userStats.labels.indexOf(monthYear);
                userStats.data[index]++;
            } else {
                userStats.labels.push(monthYear);
                userStats.data.push(1);
            }
        });

        const ctx = document.getElementById("userChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: userStats.labels,
                datasets: [
                    {
                        label: "Number of Users Created",
                        data: userStats.data,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [3, 3],
                        },
                    },
                },
            },
        });
    }, [sortedUsers]);

    return (
        <div>
            <h1>Admin Page</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th style={{ width: "15%" }} onClick={() => handleSort("fullname")}>
                            Fullname {sortBy === "fullname" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th style={{ width: "15%" }} onClick={() => handleSort("username")}>
                            Username {sortBy === "username" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th style={{ width: "20%" }} onClick={() => handleSort("email")}>
                            Email {sortBy === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th style={{ width: "20%" }} onClick={() => handleSort("institution")}>
                            Institution {sortBy === "institution" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th style={{ width: "5%" }} onClick={() => handleSort("follower")}>
                            Follower {sortBy === "follower" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th style={{ width: "5%" }} onClick={() => handleSort("following")}>
                            Following {sortBy === "following" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th style={{ width: "5%" }} onClick={() => handleSort("role")}>
                            Role {sortBy === "role" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th style={{ width: "15%" }} onClick={() => handleSort("createdAt")}>
                            Created At {sortBy === "createdAt" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.length === 0 ? (
                        <tr>
                            <td colSpan="4">No User Found</td>
                        </tr>
                    ) : (
                        sortedUsers.map((user) => (
                            <tr key={user._id} onClick={() => openUserPosts(user)}>
                                <td>{user.fullname}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.institution}</td>
                                <td>{user.followers.length}</td>
                                <td>{user.following.length}</td>
                                <td>{user.role}</td>
                                <td>{formatDate(user.createdAt)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="chart-container">
                <canvas id="userChart"></canvas>
            </div>
            {selectedUser && (
                <div>
                    {showModal && (
                        <AdminModal
                            selectedUser={selectedUser}
                            posts={posts}
                            setShowModal={setShowModal}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
