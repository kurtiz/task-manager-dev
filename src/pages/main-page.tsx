import {Navigate, Outlet} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/app-sidebar.tsx";
import Header from "@/components/header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useAuth} from "react-oidc-context";
import Loading from "@/components/loading.tsx";

const MainPage = () => {
    const auth = useAuth();

    if (auth.isLoading) {
        return (
            <Loading/>
        );
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/auth" replace/>;
    }
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="w-full">
                <div className="flex w-full items-center justify-between px-1 my-3">
                    <SidebarTrigger/>
                    <Header/>
                </div>
                {/*<Breadcrumb className="hidden md:flex mx-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <NavLink to="#">Products</NavLink>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage>All Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>*/}
                <Outlet/>
                <Toaster/>
            </main>
        </SidebarProvider>
    );
};

export default MainPage;