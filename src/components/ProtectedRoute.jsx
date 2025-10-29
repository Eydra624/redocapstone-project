import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
const userRole = localStorage.getItem("userRole");
// if no user or wrong role = block access
if (!userRole || userRole !== allowedRole) {
    return <Navigate to="/" replace />;
}

return children;
}

export default ProtectedRoute
