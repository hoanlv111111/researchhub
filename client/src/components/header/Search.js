import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const searchTypeOptions = [
    { value: "users", label: "Search for users" },
    { value: "posts", label: "Search for posts" }
];

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchType] = useState(searchTypeOptions[0]);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const handleSearch = async () => {
            if (!search) {
                setUsers([]);
                setPosts([]);
                return;
            }

            try {
                setLoad(true);
                let res;
                if (searchType.value === "posts") {
                    res = await getDataAPI(`search?type=post&q=${search}`, auth.token);
                    setPosts(res.data.posts);
                    setUsers([]);
                } else if (searchType.value === "users") {
                    res = await getDataAPI(`search?type=user&q=${search}`, auth.token);
                    setUsers(res.data.users);
                    setPosts([]);
                }
                setLoad(false);
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err?.response?.data.msg }
                });
            }
        };

        handleSearch();
    }, [search, searchType, auth, dispatch]);

    const handleClose = () => {
        setSearch("");
        setUsers([]);
        setPosts([]);
    };

    return (
        <form className="search_form">
            <div className="search_input">
                <i className="fa fa-search" aria-hidden="false"></i>
                <input
                    className="search_input_text"
                    type="text"
                    name="search"
                    value={search}
                    id="search"
                    title="Enter to Search"
                    placeholder="Search for research, people, etc..."
                    onChange={(e) =>
                        setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
                    }
                />

                <div
                    className="search_icon"
                    style={{ opacity: search ? 0 : 0.3, fontSize: "larger" }}
                >
                    <i className="fa fa-search" hidden="true" aria-hidden="false"></i>
                </div>

                <div
                    className="close_search"
                    onClick={handleClose}
                    style={{ opacity: users.length === 0 ? 0 : 1 }}
                >
                    &times;
                </div>
            </div>

            {load && <img className="loading" src={LoadIcon} alt="loading" />}

            <div className="users">
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        border="border"
                        handleClose={handleClose}
                    />
                ))}
                {posts.map((post) => (
                    <div key={post._id} className="post_card">
                        {/* Render the post card */}
                    </div>
                ))}
                {search && users.length === 0 && posts.length === 0 && (
                    <div className="no_results">No results found.</div>
                )}
                {search && (
                    <div className="search_links">
                        <a href={`/search?type=post&q=${search}`} className="search_research">
                            <i className="fa fa-search"></i> {search} in Research
                        </a>
                        <a href={`/search?type=user&q=${search}`} className="search_people">
                            <i className="fa fa-search"></i> {search} in People
                        </a>
                    </div>
                )}
            </div>
        </form>
    );
};

export default Search;
