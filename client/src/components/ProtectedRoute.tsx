// import React, { useContext, useEffect, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";

// type User = {
//   id: string;
//   email: string;
//   name: string;
//   image: string;
// };

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a check for user authentication
//     setTimeout(() => {
//       setIsLoading(false); // Set isLoading to false when loading is completed
//     }, 1000); // Adjust the time delay as needed
//   }, []);

//   return (
//     <>
//       { ? (
//         <h1>
//           {
//             <div className="spinner-border" role="status">
//               <span className="sr-only"></span>
//             </div>
//           }
//         </h1>
//       ) : user ? (
//         children
//       ) : (
//         <div className="registration-container">
//           <h2>
//             Please
//             <Button variant="secondary" onClick={() => navigate("/login")}>
//               login
//             </Button>{" "}
//             first....
//           </h2>
//         </div>
//       )}
//     </>
//   );
// }

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? <Route element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
