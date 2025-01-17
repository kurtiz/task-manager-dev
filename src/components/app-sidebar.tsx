import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {NavLink, useLocation} from "react-router-dom";
import {ChevronDown, LayoutDashboardIcon, LucideBookOpenCheck} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";


const AppSidebar = ({...props}) => {
    const {role} = props;
    const location = useLocation().pathname;

    const tasksLinks = [
        "/dashboard/tasks",
        "/dashboard/tasks/create"
    ];

    const active = (condition: boolean) => {
        return condition ? "bg-gray-300" : "";
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center">
                    <img src="/vite.svg" alt="Vite logo" className="m-2 h-8 w-8"/>
                    <div className="text-xl font-black">TaskMS Lite</div>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-3">
                <SidebarMenu>
                    {
                        (role === "admin") &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className={active(location === "/dashboard")}>
                                <NavLink to="/dashboard">
                                    <LayoutDashboardIcon/> <span>Dashboard</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                    {/* Tasks Tab with collapsible sub-tabs */}
                    <Collapsible className="group/collapsible">
                        <CollapsibleTrigger className="w-full">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={active(tasksLinks.includes(location))}>
                                    <div>
                                        <LucideBookOpenCheck/>
                                        <span>Tasks</span>
                                        <ChevronDown
                                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </CollapsibleTrigger>

                        {/* Collapsible content with sub-tabs for Tasks */}
                        <CollapsibleContent>
                            <SidebarGroup>
                                <SidebarGroupContent className="pl-2">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            className={`${active(location === "/dashboard/tasks")} pl-4`}>
                                            <NavLink to="/dashboard/tasks">View Tasks</NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    {
                                        (role === "admin") &&
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                asChild
                                                className={`${active(location === "/dashboard/tasks/create")} pl-4`}>
                                                <NavLink to="/dashboard/tasks/create">Create Task</NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    }
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
