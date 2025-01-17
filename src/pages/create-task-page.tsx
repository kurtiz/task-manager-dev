import CreateTaskForm from "@/components/forms/create-task-form.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import UnauthorizedPage from "@/pages/Unauthorized-page.tsx";

const CreateTaskPage = () => {

    if (localStorage.getItem('u-role') !== "admin") {
        return (
            <UnauthorizedPage />
        )
    }

    return (
        <div className="flex w-full justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">
                <div className="flex flex-col w-full motion-preset-expand">
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-2xl">Create Task</CardTitle>
                            <CardDescription>
                                Create a new Task
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CreateTaskForm/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskPage;