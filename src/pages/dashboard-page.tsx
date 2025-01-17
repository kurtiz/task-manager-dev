import {Users} from "lucide-react";
import {MdOutlinePendingActions} from "react-icons/md";
import {LuClipboardCheck, LuClipboardList} from "react-icons/lu";
import {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import {API_URL} from "@/constants.ts";
import {useNavigate} from "react-router-dom";
import StatisticsCard from "@/components/statistics-card.tsx";

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<{ [key: string]: number }>({});
    const auth = useAuth();
    const navigateTo = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user?.access_token}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    return navigateTo("/dashboard/tasks");
                }
                response.json().then(data => {
                    setStats(data);
                })
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [auth.user?.access_token, navigateTo]);

    return (
        <div className="mx-4 my-3 ml-6">
            <p className="text-l font-black mb-4 motion-preset-slide-right">Dashboard</p>
            <div className="grid md:grid-cols-2 gap-4 md:gap-10">
                <StatisticsCard
                    stats={stats?.totalTasks}
                    title="Tasks"
                    description="Total Number of Tasks"
                    isLoading={isLoading}
                    icon={<LuClipboardList className="w-12 h-12 sm:w-24 sm:h-24 text-gray-300"/>}
                />
                <StatisticsCard
                    stats={stats?.totalUsers}
                    title="Users"
                    description="Total Number of users"
                    isLoading={isLoading}
                    icon={<Users className="w-12 h-12 sm:w-24 sm:h-24 text-gray-300"/>}
                />
                <StatisticsCard
                    stats={stats?.totalCompletedTasks}
                    title="Completed Tasks"
                    description="Total Number of Completed Tasks"
                    isLoading={isLoading}
                    icon={<MdOutlinePendingActions className="w-12 h-12 sm:w-24 sm:h-24 text-gray-300"/>}
                />
                <StatisticsCard
                    stats={stats?.totalNotCompletedTasks}
                    title="Pending Tasks"
                    description="Total Number of Pending Tasks"
                    isLoading={isLoading}
                    icon={<LuClipboardCheck className="w-12 h-12 sm:w-24 sm:h-24 text-gray-300"/>}
                />
            </div>
        </div>
    );
};

export default DashboardPage;