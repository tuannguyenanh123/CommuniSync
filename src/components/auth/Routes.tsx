import { createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "../home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
]);

export default router;