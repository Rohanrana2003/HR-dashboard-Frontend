// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// // src/utils/ProtectedRoute.jsx
// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "./constants";
// import axios from "axios";

// const ProtectedRoute = () => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(BASE_URL + "/check-auth", {
//           withCredentials: true,
//         });
//         setIsAuthenticated(true);
//         navigate("/candidates");
//       } catch (err) {
//         setIsAuthenticated(false);
//         navigate("/auth");
//       }
//     };

//     checkAuth();
//   }, []);

//   if (isAuthenticated === null) return <h1 className="loading">Loading...</h1>;

//   return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
// };

// export default ProtectedRoute;
