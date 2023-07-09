import React, { useEffect, useState } from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import Saved from "../../components/profile/Saved";
import Publication from "../../components/profile/Publication";
import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import LeftSidebar from "../../components/home/LeftSideBar";

const Profile = () => {
    const { profile, auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("posts");

    useEffect(() => {
        if (profile.ids.every((item) => item !== id)) {
            dispatch(getProfileUsers({ id, auth }));
        }
    }, [id, auth, dispatch, profile.ids]);

    return (
        <div className="profile_container row mx-0">
            <div className="col-md-3">
                <LeftSidebar />
            </div>
            <div className="profile col-md-9">
                <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

                {auth.user._id === id || (profile.user && profile.user._id === id) ? (
                    <div className="profile_tab">
                        <button
                            className={activeTab === "posts" ? "active" : ""}
                            onClick={() => setActiveTab("posts")}
                        >
                            Posts
                        </button>
                        {auth.user._id === id && (
                            <>
                                <button
                                    className={activeTab === "saved" ? "active" : ""}
                                    onClick={() => setActiveTab("saved")}
                                >
                                    Saved
                                </button>
                            </>
                        )}
                        <button
                            className={activeTab === "publication" ? "active" : ""}
                            onClick={() => setActiveTab("publication")}
                        >
                            Publication
                        </button>
                    </div>
                ) : (
                    <div className="profile_tab">
                        <button
                            className={activeTab === "posts" ? "active" : ""}
                            onClick={() => setActiveTab("posts")}
                        >
                            Posts
                        </button>
                        <button
                            className={activeTab === "publication" ? "active" : ""}
                            onClick={() => setActiveTab("publication")}
                        >
                            Publication
                        </button>
                    </div>
                )}

                {profile.loading ? (
                    <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                ) : (
                    <>
                        {activeTab === "saved" ? (
                            <Saved auth={auth} dispatch={dispatch} />
                        ) : activeTab === "publication" ? (
                            <Publication auth={auth} profile={profile} dispatch={dispatch} id={id} />
                        ) : (
                            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
