import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import ViewTaskForm from "@/components/forms/view-task-form.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_URL} from "@/constants.ts";
import {useAuth} from "react-oidc-context";
import Loading from "@/components/loading.tsx";

const ViewTaskPage = () => {

    const [pageLoading, setPageLoading] = useState(true);
    const [task, setTask] = useState<Task | null>(null);
    const auth = useAuth();

    const {taskId} = useParams();

    useEffect(() => {
        setPageLoading(true);
        fetch(`${API_URL}/task/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user?.access_token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setTask(data);
            }).finally(() => setPageLoading(false));

    }, [auth.user?.access_token, taskId]);

    if (pageLoading) {
        return (
            <Loading/>
        );
    }
    return (
        <div className="flex w-full justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">
                <div className="flex flex-col w-full motion-preset-expand">
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-2xl">View Task</CardTitle>
                            <CardDescription>
                                View and edit Task
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ViewTaskForm task={task}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ViewTaskPage;