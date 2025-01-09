import React, {useEffect, useState} from 'react';
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
import {v4 as uuidv4} from 'uuid';
import {useAuth} from "react-oidc-context";
import UserSelectMultiple, {UserSelect} from "@/components/multiple-user-select";
import {API_URL} from "@/constants.ts";
import {useToast} from "@/hooks/use-toast.ts"; // Import the MultiSelect component

// Define Task schema with Zod for validation
const taskSchema = z.object({
    id: z.string().min(1, {message: 'Task ID is required'}),
    title: z.string().min(1, {message: 'Title is required'}),
    description: z.string().min(1, {message: 'Description is required'}),
    priority: z.enum(['High', 'Medium', 'Low'], {message: 'Priority is required'}),
    status: z.enum(['Pending', 'Completed', 'Backlog'], {message: 'Status is required'}),
    due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {message: 'Invalid date'}),
    assigned_to: z.array(z.string()).min(1, {message: 'At least one assignee is required'}), // Multiple users
    created_by: z.string().min(1, {message: 'Creator is required'}),
});

type TaskFormInputs = z.infer<typeof taskSchema>;

const CreateTaskForm: React.FC = () => {
    const {toast} = useToast();
    const auth = useAuth();
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<UserSelect[]>([]); // You will need to fetch the user data from an API

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
            });
    }, [auth.user?.access_token]);

    const {control, handleSubmit, reset, formState: {errors}} = useForm<TaskFormInputs>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            id: uuidv4(),
            title: '',
            description: '',
            priority: 'Medium',
            status: 'Pending',
            due_date: '',
            assigned_to: [], // Default assigned user (example)
            created_by: userId,
        },
    });

    // Update form default values when userId changes
    useEffect(() => {
        if (userId) {
            reset((prevValues) => ({
                ...prevValues,
                created_by: userId,  // Update created_by field
            }));
        }
    }, [userId, reset]);

    const onSubmit = async (data: TaskFormInputs) => {
        // await fetch()
        setIsLoading(true);
        fetch(`${API_URL}/task/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user?.access_token}`
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                toast({
                    title: 'Task created successfully',
                    description: 'Your task has been created successfully.',
                });
                reset();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to create task. Please try again.',
                });
            }
        }).finally(() => setIsLoading(false));
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

                {/* Due Date (Updated with Calendar) */}
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
                                        disabled={(date: Date) => date < new Date()} // Disable past dates
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date.message}</p>}
                </div>

                {/* Submit Button */}
                <Button className="w-full" disabled={isLoading} type="submit">
                    {
                        (isLoading) ?
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Submitting...
                            </> :
                            "Submit"
                    }
                </Button>
            </form>
        </div>
    );
};

export default CreateTaskForm;
