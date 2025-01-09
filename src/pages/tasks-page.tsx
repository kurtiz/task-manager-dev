import {Button} from "@/components/ui/button.tsx";
import {LayoutGrid, Rows} from "lucide-react";
import TaskCard from "@/components/task-card.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API_URL} from "@/constants.ts";
import {useAuth} from "react-oidc-context";
import Loading from "@/components/loading.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TasksPage = () => {
    const [view, setView] = useState<"free" | "grouped">("grouped");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortType, setSortType] = useState<"dueDate" | "createdAt">("dueDate"); // Change completedDate to createdAt
    const navigateTo = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        fetch(`${API_URL}/tasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user?.access_token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, [auth.user?.access_token]);

    const changeView = () => {
        setView(view === "free" ? "grouped" : "free");
    };

    const changeSortOrder = (order: "asc" | "desc") => {
        setSortOrder(order);
    };

    const changeSortType = (type: "dueDate" | "createdAt") => {
        setSortType(type);
    };

    // Sort tasks based on selected criteria (dueDate or createdAt) and order (asc or desc)
    const sortedTasks = [...tasks].sort((a, b) => {
        const dateA = new Date(sortType === "dueDate" ? a.due_date : a.createdAt); // Change completed_date to createdAt
        const dateB = new Date(sortType === "dueDate" ? b.due_date : b.createdAt); // Change completed_date to createdAt

        if (sortOrder === "asc") {
            return dateA.getTime() - dateB.getTime();
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    });

    return (
        <div className="mx-4 my-3 ml-6">
            <p className="text-l font-black mb-4">Tasks Page</p>
            <div className="flex">
                <div className="flex w-full gap-3">
                    <Button variant="outline" onClick={changeView}>
                        {view === "free" ? <Rows/> : <LayoutGrid/>}
                        View
                    </Button>
                </div>

                <div className="flex w-full md:justify-end justify-normal gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline">
                                Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="bg-gray-100">Date Due</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                onClick={() => {
                                    changeSortType("dueDate");
                                    changeSortOrder("asc");
                                }}
                            >
                                Ascending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    changeSortType("dueDate");
                                    changeSortOrder("desc");
                                }}
                            >
                                Descending
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuLabel className="bg-gray-100">Date
                                Created</DropdownMenuLabel> {/* Changed to Date Created */}
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                onClick={() => {
                                    changeSortType("createdAt");
                                    changeSortOrder("asc");
                                }}
                            >
                                Ascending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    changeSortType("createdAt");
                                    changeSortOrder("desc");
                                }}
                            >
                                Descending
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={() => navigateTo("/dashboard/tasks/create")}>Create Task</Button>
                </div>
            </div>

            {isLoading ? (
                <Loading/>
            ) : tasks.length > 0 ? (
                view === "free" ? (
                    <div
                        className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 motion-preset-slide-right">
                        {sortedTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                taskId={task.id}
                                title={task.title}
                                priority={task.priority}
                                status={task.status}
                                dueDate={task.due_date}
                                assignedTo={task.assigned_to}
                                createdAt={task.createdAt}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        <p className="text-l font-bold motion-preset-slide-right">Backlog</p>
                        <div
                            className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 motion-preset-slide-right motion-delay-75">
                            {sortedTasks
                                .filter((task) => task.status === "Backlog")
                                .map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        taskId={task.id}
                                        title={task.title}
                                        priority={task.priority}
                                        status={task.status}
                                        dueDate={task.due_date}
                                        assignedTo={task.assigned_to}
                                        createdAt={task.createdAt}
                                    />
                                ))}
                        </div>
                        <p className="text-l font-bold mt-4 motion-preset-slide-right motion-delay-[100ms]">Pending</p>
                        <div
                            className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 motion-preset-slide-right motion-delay-[110ms]">
                            {sortedTasks
                                .filter((task) => task.status === "Pending")
                                .map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        taskId={task.id}
                                        title={task.title}
                                        priority={task.priority}
                                        status={task.status}
                                        dueDate={task.due_date}
                                        assignedTo={task.assigned_to}
                                        createdAt={task.createdAt}
                                    />
                                ))}
                        </div>
                        <p className="text-l font-bold mt-4 motion-preset-slide-right motion-delay-[140ms]">Completed</p>
                        <div
                            className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 motion-preset-slide-right motion-delay-[180ms]">
                            {sortedTasks
                                .filter((task) => task.status === "Completed")
                                .map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        taskId={task.id}
                                        title={task.title}
                                        priority={task.priority}
                                        status={task.status}
                                        dueDate={task.due_date}
                                        assignedTo={task.assigned_to}
                                        createdAt={task.createdAt}
                                    />
                                ))}
                        </div>
                    </div>
                )
            ) : (
                <div className="flex h-[70vh] items-center justify-center">
                    <div className="flex flex-col items-center">
                        <img src="/no-tasks.png" alt="no tasks" className="h-1/3 w-1/3 mx-auto"/>
                        <p className="text-lg font-semibold">No Tasks</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksPage;
