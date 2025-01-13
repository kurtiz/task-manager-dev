import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {CalendarIcon, Loader2} from "lucide-react";
import {format} from "date-fns";
import {useAuth} from "react-oidc-context";
import UserSelectMultiple, {UserSelect} from "@/components/multiple-user-select";
import {API_URL} from "@/constants.ts";
import {useToast} from "@/hooks/use-toast.ts";

const taskSchema = z.object({
    title: z.string().min(1, {message: 'Title is required'}),
    description: z.string().min(1, {message: 'Description is required'}),
    priority: z.enum(['High', 'Medium', 'Low'], {message: 'Priority is required'}),
    status: z.enum(['Pending', 'Completed', 'Backlog'], {message: 'Status is required'}),
    due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {message: 'Invalid date'}),
    assigned_to: z.array(z.string()).min(1, {message: 'At least one assignee is required'}),
});

type TaskFormInputs = z.infer<typeof taskSchema>;

const ViewTaskForm = ({...props}) => {
    const {task} = props;
    const {toast} = useToast();
    const auth = useAuth();
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<UserSelect[]>([]);
    const [mode, setMode] = useState<'edit' | 'view'>('view');

    // const userRole = localStorage.getItem("u-role");

    useEffect(() => {
        setUserId(auth.user?.profile.sub || "");
    }, [auth.user?.profile.sub]);

    useEffect(() => {
        fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user?.access_token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error(error));
    }, [auth.user?.access_token]);

    const {control, handleSubmit, reset, formState: {errors, dirtyFields}} = useForm<TaskFormInputs>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            priority: 'Medium',
            status: 'Pending',
            due_date: '',
            assigned_to: [],
        },
    });

    // Update form default values when task data is available
    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                due_date: task.due_date,
                assigned_to: task.assigned_to,
            });
        }
    }, [task, reset]);

    // Update form default values when userId changes
    useEffect(() => {
        if (userId) {
            reset((prevValues) => ({
                ...prevValues,
                created_by: userId,
            }));
        }
    }, [userId, reset]);

    const onSubmit = async (data: TaskFormInputs) => {
        if (Object.keys(dirtyFields).length === 0) {
            // If no changes have been made
            toast({
                variant: 'destructive',
                title: 'No changes',
                description: 'No changes detected in the form.',
            });
            return;
        }

        setIsLoading(true);
        fetch(`${API_URL}/task/${task?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user?.access_token}`
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                toast({
                    title: 'Task updated successfully',
                    description: 'Your task has been updated successfully.',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to create task. Please try again.',
                });
            }
        }).finally(() => {
            setMode("view");
        });
    };

    return (
        <div className="px-4 my-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Controller
                        name="title"
                        control={control}
                        render={({field}) => (
                            <Input {...field} type="text" id="title" placeholder="Title" disabled={isLoading}/>
                        )}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({field}) => (
                            <Textarea {...field} id="description" placeholder="Description" disabled={isLoading}/>
                        )}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div className="flex gap-2">
                    {/* Priority */}
                    <div className="w-full">
                        <Label htmlFor="priority">Priority</Label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({field}) => (
                                <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Priority"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High"><Badge variant="destructive">High</Badge></SelectItem>
                                        <SelectItem value="Medium"><Badge variant="warning">Medium</Badge></SelectItem>
                                        <SelectItem value="Low"><Badge variant="success">Low</Badge></SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
                    </div>

                    {/* Status */}
                    <div className="w-full">
                        <Label htmlFor="status">Status</Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({field}) => (
                                <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Backlog"><Badge
                                            variant="destructive">Backlog</Badge></SelectItem>
                                        <SelectItem value="Pending"><Badge
                                            variant="warning">Pending</Badge></SelectItem>
                                        <SelectItem value="Completed"><Badge
                                            variant="success">Completed</Badge></SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                    </div>
                </div>

                {/* Assigned To (MultiSelect component) */}
                <div>
                    <Label htmlFor="assigned_to">Assign To</Label>
                    <Controller
                        name="assigned_to"
                        control={control}
                        render={({field}) => (
                            <UserSelectMultiple {...field} disabled={isLoading} users={users}/>
                        )}
                    />
                    {errors.assigned_to && <p className="text-red-500 text-sm mt-1">{errors.assigned_to.message}</p>}
                </div>

                {/* Due Date */}
                <div>
                    <Label htmlFor="due_date">Due Date</Label>
                    <Controller
                        name="due_date"
                        control={control}
                        render={({field}) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full pl-3 text-left font-normal"
                                        disabled={isLoading}>
                                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={field.value ? new Date(field.value) : undefined}
                                        onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : '')}
                                        disabled={(date: Date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date.message}</p>}
                </div>

                {/* Submit Button */}
                {mode === "edit" ? (
                    <div className="flex gap-4">
                        <Button
                            className="w-full"
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setMode("view");
                                setIsLoading(true);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button className="w-full" disabled={isLoading} type="submit">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Submitting...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="w-full"
                        type="button"
                        onClick={() => {
                            setMode("edit");
                            setIsLoading(false);
                        }}
                        disabled={!isLoading}
                    >
                        Edit
                    </Button>
                )}
            </form>
        </div>
    );
};

export default ViewTaskForm;
