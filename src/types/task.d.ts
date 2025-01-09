type Task = {
    id: string;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Pending" | "Completed" | "Backlog";
    due_date: string;
    start_date: string;
    completion_date: string | null;
    assigned_to: string[];
    created_by: string;
    createdAt: string;
    updatedAt: string;
};
