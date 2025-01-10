
const NoTasks = () => {
    return (
        <div className="flex h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center">
                <img src="/no-tasks.png" alt="no tasks" className="h-1/3 w-1/3 mx-auto"/>
                <p className="text-lg font-semibold">No Tasks</p>
            </div>
        </div>
    );
};

export default NoTasks;