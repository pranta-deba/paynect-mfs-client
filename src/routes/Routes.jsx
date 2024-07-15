import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/who-we-are", element: 'who-we-are' },
            { path: "/branch", element: 'branch' },
            { path: "/send-money", element: 'send money' },
            { path: "/cash-out", element: 'cash-out' },
            { path: "/pay-bill", element: 'pay-bill' },
            { path: "/mobile-recharge", element: 'mobile-recharge' },
            { path: "/paynect-to-bank", element: 'paynect-to-bank' },
            { path: "/loan", element: 'loan' },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
]);