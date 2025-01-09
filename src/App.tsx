import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthGuard from "@/guards/auth-guard.tsx";
import MainPage from "@/pages/main-page.tsx";
import Error404Page from "@/pages/Error404-page.tsx";
import AuthPage from "@/pages/auth-page.tsx";
import LogoutPage from "@/pages/logout-page.tsx";
import TasksPage from "@/pages/tasks-page.tsx";
import TaskLayout from "@/pages/layout/task-layout.tsx";
import CreateTaskPage from "@/pages/create-task-page.tsx";
import DashboardPage from "@/pages/dashboard-page.tsx";
import ViewTaskPage from "@/pages/view-task-page.tsx"; // Assuming you have a create task form component

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthGuard/>,
    },
    {
        path: "/auth", // Ensure you have a route for login
        element: <AuthPage/>,
    },
    {
        path: "/dashboard",
        element: <MainPage/>,
        children: [
            {
                index: true,
                element: <DashboardPage/>,
            },
            {
                path: "tasks",
                element: <TaskLayout/>,
                children: [
                    {
                        index: true,
                        element: <TasksPage/>,
                    },
                    {
                        path: "create",
                        element: <CreateTaskPage/>,
                    },
                    {
                        path: "view/:taskId",
                        element: <ViewTaskPage/>,
                    }
                ],
            },
        ],
    },
    {
        path: "/logout", // Ensure you have a route for logout
        element: <LogoutPage/>,
    },
    {
        path: "*", // Catch-all route for unmatched URLs
        element: <Error404Page/>,
    },
]);

const App = () => {
    return <RouterProvider router={router}/>;
};

export default App;
