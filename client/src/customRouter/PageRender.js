import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
    if (pageName === "login" || pageName === "register") {
        return require(`../pages/${pageName}`).default;
    } else {
        let component;

        try {
            component = require(`../pages/${pageName}`).default;
        } catch (err) {
            return null;
        }

        return React.createElement(component);
    }
};

const PageRender = () => {
    const { page, id } = useParams();
    const { auth } = useSelector((state) => state);

    let pageName = "";

    if (auth.token) {
        if (id) {
            pageName = `${page}/[id]`;
        } else {
            pageName = `${page}`;
        }
    } else {
        pageName = "login";
    }

    const Component = generatePage(pageName);

    if (pageName === "login" || pageName === "register" || Component) {
        if (page === "admin" && auth.user?.role !== "admin") {
            return <NotFound />;
        }
        return Component;
    } else {
        return <NotFound />;
    }
};

export default PageRender;
