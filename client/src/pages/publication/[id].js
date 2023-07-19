import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";
import moment from "moment";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

const PublicationPage = () => {
    const { id: publicationId } = useParams();
    const { auth } = useSelector((state) => state);
    const [publication, setPublication] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataAPI(`user_publications/${publicationId}`, auth.token);
                console.log("res publication:", res);
                const data = res.data;
                setPublication(data);
            } catch (error) {
                console.error("Error fetching publication:", error);
            }
        };
        fetchData();
    }, [auth.token, publicationId]);

    if (!publication) {
        return <h2>No Publication Found</h2>;
    }
    return (
        <div className="publication">
            <Link to={`/profile/${publication.user._id}`} className="publication_info col-md-3">
                <Avatar src={publication.user.avatar} size="big-avatar" />
                <h3>{publication.user.fullname}</h3>
            </Link>
            <div className="publication_detail col-md-8">
                <Link>
                    <h3>{publication.title}</h3>
                </Link>
                <table id="publication_detail_table">
                    <tbody>
                        <tr>
                            <td id="publication_detail_table_td">Author</td>
                            <td>{publication.author}</td>
                        </tr>
                        <tr>
                            <td id="publication_detail_table_td">Publication Date</td>
                            <td>{moment(publication.year).format("YYYY-MM-DD")}</td>
                        </tr>
                        <tr>
                            <td id="publication_detail_table_td">Conference</td>
                            <td>{publication.conference}</td>
                        </tr>
                        <tr>
                            <td id="publication_detail_table_td">Pages</td>
                            <td>{publication.pages}</td>
                        </tr>
                        <tr>
                            <td id="publication_detail_table_td">Publisher</td>
                            <td>{publication.publisher}</td>
                        </tr>
                        <tr>
                            <td id="publication_detail_table_td">Description</td>
                            <td>{publication.description}</td>
                        </tr>
                        <tr>
                            <td id="publication_detail_table_td">Total citations</td>
                            <td>{publication.citation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PublicationPage;
