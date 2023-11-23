import { useState } from 'react'
import '../src/styles/App.css'
import 'bootstrap/dist/css/bootstrap.css';
import SignUp from "../src/pages/SignUp";
import "../src/styles/App.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "../src/pages/Home"



function App() {
  //  const location = useLocation();
  const navigate = useNavigate();
  const { displayUser, logout, user } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/home");
    }
  }, [location]);

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
         <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
            </Route>
    )
  );
  return (
    <>
       <AuthContextProvider>
        <RouterProvider router={router} />
        {<SignUp/>}

        <Outlet />
      </AuthContextProvider>
    </>
  )
}

export default App
