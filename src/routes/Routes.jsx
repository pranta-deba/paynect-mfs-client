import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Private from "./Private";
import SendMoney from "../pages/SendMoney/SendMoney";
import CashOut from "../pages/CashOut/CashOut";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/who-we-are", element: 'who-we-are' },
            { path: "/branch", element: 'branch' },
            { path: "/send-money", element: <Private><SendMoney /></Private> },
            { path: "/cash-out", element: <Private><CashOut/></Private> },
            { path: "/cash-in", element: <Private>'cash-in'</Private> },
            { path: "/pay-bill", element: <Private>'pay-bill'</Private> },
            { path: "/mobile-recharge", element: <Private>'mobile-recharge'</Private> },
            { path: "/paynect-to-bank", element: <Private>'paynect-to-bank'</Private> },
            { path: "/loan", element: <Private>'loan'</Private> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
]);