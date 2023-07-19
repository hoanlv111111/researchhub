import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../utils/fetchData";
import Chart from "chart.js";

const AdminModal = ({ setShowModal, selectedUser }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataAPI(`user_posts/${selectedUser._id}`, auth.token);
                const data = res.data.posts;
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchData();
    }, [auth.token, dispatch, selectedUser]);

    useEffect(() => {
        const groupedPostsByMonth = groupPostsByMonth(posts);
        const groupedPostsByYear = groupPostsByYear(posts);

        generateChart(groupedPostsByMonth, "postChartMonth", "Number of Posts per Month");
        generateChart(groupedPostsByYear, "postChartYear", "Number of Posts per Year");
    }, [1]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const groupPostsByMonth = (posts) => {
        const groupedPosts = {};
        posts.forEach((post) => {
            const month = new Date(post.createdAt).getMonth();
            if (groupedPosts[month]) {
                groupedPosts[month].push(post);
            } else {
                groupedPosts[month] = [post];
            }
        });
        return groupedPosts;
    };

    const groupPostsByYear = (posts) => {
        const groupedPosts = {};
        posts.forEach((post) => {
            const year = new Date(post.createdAt).getFullYear();
            if (groupedPosts[year]) {
                groupedPosts[year].push(post);
            } else {
                groupedPosts[year] = [post];
            }
        });
        return groupedPosts;
    };

    const generateChart = (groupedPosts, chartId, chartLabel) => {
        const chartData = {
            labels: [],
            data: [],
        };

        Object.keys(groupedPosts).forEach((key) => {
            const monthYear = formatDate(groupedPosts[key][0].createdAt);
            chartData.labels.push(monthYear);
            chartData.data.push(groupedPosts[key].length);
        });

        const ctx = document.getElementById(chartId).getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: chartLabel,
                        data: chartData.data,
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
    };

    const formatDate = (dateString) => {
        const options = { month: "short", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="modal_post_user">
            <form>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                ></button>
                <h2>Posts</h2>
                <div className="modal_content">
                    {posts.length === 0 ? (
                        <p>No posts available</p>
                    ) : (
                        <div>
                            <div className="chart-container">
                                <canvas id="postChartMonth"></canvas>
                            </div>
                            <div className="chart-container">
                                <canvas id="postChartYear"></canvas>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AdminModal;
