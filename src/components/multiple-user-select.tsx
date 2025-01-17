// src/components/UserSelect.tsx
import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

export interface UserSelect {
    id: string;
    name: string;
    avatar: string;
}


const UserSelectMultiple = ({...props}) => {
    const {users, value, onChange, disabled} = props;
    const [cleanValue, setCleanValue] = useState<string>("");

    const handleSelect = (userId: string) => {
        if (!value.includes(userId)) {
            // Add user to the list
            onChange([...value, userId]);
        }
        setCleanValue(""); // Clear the value input
    };

    const removeUser = (userId: string) => {
        const updatedUsers = value.filter((id: string) => id !== userId);
        onChange(updatedUsers); // Update the value with the selected users
    };

    return (
        <div className="space-y-4">
            {/* Select dropdown */}
            <Select value={cleanValue} onValueChange={handleSelect} disabled={disabled}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Assignees"/>
                </SelectTrigger>
                <SelectContent>
                    {users?.length > 0 ? (
                        <SelectGroup>
                            <SelectLabel>Users</SelectLabel>
                            {users?.map((user: UserSelect) => (
                                <SelectItem key={user.id} value={user.id}>
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="mr-2 my-1">
                                            <AvatarImage src={user?.avatar}/>
                                            <AvatarFallback>{user?.name?.substring(0, 1)} </AvatarFallback>
                                        </Avatar>
                                        <span>{user.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ) : (
                        <SelectGroup>
                            <SelectLabel>No Users</SelectLabel>
                        </SelectGroup>
                    )}
                </SelectContent>
            </Select>

            {/* Selected users */}
            <div className="space-x-2">
                {value.map((userId: string) => {
                    const user = users.find((user: UserSelect) => user.id === userId);
                    if (!user) return null;
                    return (
                        <Badge key={user.id} variant="outline" className={`${disabled ? "cursor-not-allowed bg-gray-100/30 border-gray-200/50" : "" } m-1 rounded-full`}>
                            <Avatar className="mr-2 my-1">
                                <AvatarImage src={user.avatar}/>
                                <AvatarFallback>{user?.name?.substring(0, 1)} </AvatarFallback>
                            </Avatar>
                            <span>{user.name.substring(0, 11)}...</span>
                            <Button
                                variant="ghost"
                                disabled={disabled}
                                onClick={() => removeUser(user.id)}
                                className="ml-2 rounded-full"
                            >
                                x
                            </Button>
                        </Badge>
                    );
                })}
            </div>
        </div>
    );
};

export default UserSelectMultiple;
