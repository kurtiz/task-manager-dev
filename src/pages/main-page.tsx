import {Navigate, Outlet} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/app-sidebar.tsx";
import Header from "@/components/header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useAuth} from "react-oidc-context";
import Loading from "@/components/loading.tsx";
import {useEffect} from "react";
import {API_URL} from "@/constants.ts";

const MainPage = () => {
    const auth = useAuth();

    useEffect(() => {
        // Only fetch user role if it's not set in localStorage
        if (!localStorage.getItem("u-role") && auth.user?.access_token) {
            fetch(`${API_URL}/user/current`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.user?.access_token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data?.role) {
                        localStorage.setItem("u-role", data.role);
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch user role:", error);
                });
        }
    }, [auth.user?.access_token]);

    if (auth.isLoading) {
        return <Loading/>;
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/auth" replace/>;
    }

    const userRole = localStorage.getItem("u-role");

    return (
        <SidebarProvider>
            <AppSidebar role={userRole}/>
            <main className="w-full">
                <div className="flex w-full items-center justify-between px-1 my-3">
                    <SidebarTrigger/>
                    <Header/>
                </div>
                <Outlet/>
                <Toaster/>
            </main>
        </SidebarProvider>
    );
};

export default MainPage;
