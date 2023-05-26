import { Route, Redirect } from "react-router-dom"

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem("firstLogin")
    return firstLogin ? <Route {...props} /> : <Redirect to="/" />
        ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRouter
