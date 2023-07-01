import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";
import axios from "axios";

const EditProfile = ({ setOnEdit }) => {
    const initState = {
        fullname: "",
        mobile: "",
        institution: "",
        skill: [],
        website: "",
        story: "",
        gender: "",
    };
    const [userData, setUserData] = useState(initState);
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const { fullname, mobile, institution, website, story, gender } = userData;

    const [avatar, setAvatar] = useState("");

    const { auth, theme } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(auth.user);
    }, [auth.user]);

    const changeAvatar = (e) => {
        const file = e.target.files[0];

        const err = checkImage(file);
        if (err)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err },
            });

        setAvatar(file);
    };

    let timeoutId = null;

    const handleInstitutionSearch = (query) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/hoanlv214/university-domains-list/master/world_universities_and_domains.json"
                );

                const institutions = response.data.filter((item) =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                );

                const institutionNames = institutions.map((item) => item.name);
                setInstitutionOptions(institutionNames);
            } catch (error) {
                console.error("Error fetching institutions:", error);
            }
        }, 2000);
    };

    const handleSkillSearch = async (query) => {
        try {
            const response = await axios.get(
                "https://raw.githubusercontent.com/hoanlv214/university-domains-list/master/skills.json"
            );

            const skills = response.data.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );

            const skillNames = skills.map((item) => item.name);
            setSkillOptions(skillNames);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    const handleSkillSelection = (e) => {
        const selectedSkill = e.target.value;
        setSelectedSkills([...selectedSkills, selectedSkill]);
    };

    const removeSelectedSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter((selected) => selected !== skill));
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUserData = { ...userData, skill: selectedSkills };
        dispatch(updateProfileUser({ userData: updatedUserData, avatar, auth }));
    };


    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close" onClick={() => setOnEdit(false)}>Close</button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img
                        src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                        alt="avatar"
                        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                    />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            name="fullname"
                            value={fullname}
                            onChange={handleInput}
                        />
                        <small
                            className="text-danger position-absolute"
                            style={{ top: "50%", right: "5px", transform: "translateY(-50%)" }}
                        >
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" value={mobile}
                        className="form-control"
                        onChange={handleInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="institution">Institution</label>
                    <input
                        type="text"
                        className="form-control"
                        id="institution"
                        name="institution"
                        onChange={handleInput}
                        value={institution}
                        style={{ background: `${alert.institution ? "#fd2d6a14" : ""}` }}
                        autoComplete="off"
                        list="institutionOptions"
                        onKeyUp={(e) => handleInstitutionSearch(e.target.value)}
                    />
                    <datalist id="institutionOptions">
                        {institutionOptions.map((option) => (
                            <option key={option} value={option} />
                        ))}
                    </datalist>
                </div>

                <div className="form-group">
                    <label htmlFor="skills">Skills</label>
                    <div className="selected-skills">
                        {selectedSkills.map((skill) => (
                            <li
                                key={skill}
                                value={skill}
                                className="selected-skill"
                                onClick={() => removeSelectedSkill(skill)}
                                onChange={handleInput}
                            >
                                {skill}
                            </li>
                        ))}
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        id="skill"
                        name="skill"
                        autoComplete="off"
                        list="skillOptions"
                        onKeyUp={(e) => handleSkillSearch(e.target.value)}
                    />
                    <select
                        id="skillOptions"
                        className="form-control"
                        onChange={handleSkillSelection}
                    >
                        <option value="">Choose from our suggestions or start typing</option>
                        {skillOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        name="website"
                        value={website}
                        className="form-control"
                        onChange={handleInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="story">Story</label>
                    <textarea
                        name="story"
                        value={story}
                        className="form-control"
                        onChange={handleInput}
                    />

                    <small className="text-danger d-block text-right">
                        {story.length}/200
                    </small>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select
                        name="gender"
                        id="gender"
                        value={gender}
                        className="custom-select text-capitalize"
                        onChange={handleInput}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;