import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {format} from "date-fns";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {EyeIcon, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const TaskCard = ({...props}) => {
    const {key, taskId, title, assignedTo, createdAt, dueDate, status, priority} = props;

    const navigateTo = useNavigate();

    return (
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger>
                    <Card key={key} className="cursor-pointer select-none hover:bg-gray-100"
                          onClick={() => navigateTo(`/dashboard/tasks/view/${taskId}`)}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{format(createdAt, "h:mm aa")} • {format(createdAt, "do MMM yyyy")}</CardDescription>
                            <div className="flex gap-1">
                                {/* Priority Badge */}
                                <Badge
                                    variant={priority === "High" ? "destructive" : priority === "Medium" ? "warning" : "success"}
                                >
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </Badge>

                                {/* Status Badge */}
                                <Badge
                                    variant={status === "Completed" ? "success" : status === "Pending" ? "warning" : "destructive"}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Due Date: {format(dueDate, "do MMM yyyy")}</p>
                            </div>

                            <div className="flex -space-x-4 rtl:space-x-reverse">
                                {assignedTo?.map((user: {
                                    id: string,
                                    name: string,
                                    avatar: string
                                } | null | undefined) => (
                                    <TooltipProvider key={user?.id}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Avatar key={user?.id}
                                                        className="border-4 border-white hover:shadow-md">
                                                    <AvatarImage src={user?.avatar}/>
                                                    <AvatarFallback>{user?.name.substring(0, 1)}</AvatarFallback>
                                                </Avatar>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{user?.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </CardHeader>
                    </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={() => navigateTo(`/dashboard/tasks/view/${taskId}`)}>
                        <EyeIcon className="w-4 h-4 mr-3 text-gray-500"/>View
                    </ContextMenuItem>

                    {/* DialogTrigger inside ContextMenuItem to trigger delete confirmation */}
                    <DialogTrigger asChild>
                        <ContextMenuItem>
                            <Trash className="w-4 h-4 mr-3 text-gray-500"/>Delete
                        </ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>

            {/* Dialog Content */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your task
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <div className="flex gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Delete</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TaskCard;
