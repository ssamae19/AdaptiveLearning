import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {

    console.log("test", isLoggedIn)

    if (isLoggedIn == false) {
        return <Navigate to="/" />;
    }
    return children;

};
export default Protected;