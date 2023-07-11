import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";
import { Link } from "react-router-dom";

const CategoryPage = () => {
    const { id: categoryId } = useParams();
    const { auth } = useSelector((state) => state);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataAPI(`user_categories/${categoryId}`, auth.token);
                const data = res.data; // data = category
                console.log("data", data.postID)
                setCategory(data);

            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };
        fetchData();
    }, [auth.token, categoryId]);

    if (!category) {
        return <h2>No Category Found</h2>;
    }

    return (
        <div className="category">
            <h3>{category.topic}</h3>
            <div className="">
                <Link to={`/post/${category.postID}`} className="category__link">
                    {category.postID}
                </Link>
            </div>
        </div>
    );
};

export default CategoryPage;
