import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import UserCard from "../components/UserCard";
import LoadIcon from "../images/loading.gif";

import Posts from "../components/home/Posts";
import PostSearch from "../components/home/PostSearch";

const searchTypeOptions = [
    { value: "user", label: "Search for user" },
    { value: "post", label: "Search for post" },
];

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchType, setSearchType] = useState(searchTypeOptions[0].value);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;

        try {
            setLoading(true);
            let res;

            if (searchType === "user") {
                res = await getDataAPI(`search?type=user&q=${search}`, auth.token);
                setUsers(res.data.users);
                setPosts([]);
            } else if (searchType === "post") {
                res = await getDataAPI(`search?type=post&q=${search}`, auth.token);
                setPosts(res.data.posts);
                setUsers([]);
            }

            setLoading(false);

            const url = `search?type=${searchType}&q=${search}`;
            history.push(url);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err?.response?.data.msg },
            });

            setLoading(false);
        }
    };

    const handleClose = () => {
        setSearch("");
        setUsers([]);
        setPosts([]);
    };

    return (
        <div className="search_page">
            <h1>Search in ResearchHub </h1>
            <form className="search_form" onSubmit={handleSearch}>
                <input
                    type="text"
                    name="query"
                    value={search}
                    id="search"
                    onChange={(e) =>
                        setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
                    }
                />

                <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                    <button type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
                {loading && <img className="loading" src={LoadIcon} alt="loading" />}

                <div className="search_close" onClick={handleClose}>
                    &times;
                </div>
                <div className="search_type">
                    {searchTypeOptions.map((option) => (
                        <label key={option.value}>
                            <input
                                type="radio"
                                name="searchType"
                                value={option.value}
                                checked={searchType === option.value}
                                onChange={() => setSearchType(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </form>
            <div className="search_results">
                <h1>Search results</h1>
                {/* Render the UserCard component when searchType is "user" */}
                {searchType === "user" && (
                    <div className="users">
                        {searchType === "user" && (
                            <div className="users">
                                {!loading && users.length === 0 && (
                                    <h2>No User Found</h2>
                                )}
                                {users.map((user) => (
                                    <UserCard
                                        key={user._id}
                                        user={user}
                                        border="border"
                                        handleClose={handleClose}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                )}

                {/* Render the Posts component when searchType is "post" */}
                {searchType === "post" && (
                    <div>
                        {/* Render the search results */}
                        {!loading && posts.length === 0 && (
                            <h2>No Post Found</h2>
                        )}
                        {posts.map((post) => (
                            <PostSearch
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
