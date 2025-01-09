import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "react-oidc-context";
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {API_URL} from "@/constants.ts";

const Header = () => {
    const auth = useAuth();

    const [user, setUser] = useState(auth.user?.profile);
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (auth.user) {
            setUser(auth.user.profile);
        }

        fetch(`${API_URL}/user/avatar`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user?.access_token}`
            },
            method: "POST",
            body: JSON.stringify({
                id:  auth.user?.profile.sub
            }),
        }).then(
            (response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setAvatar(data.avatar);
                    })
                }
            }
        )
    }, [auth.user]);

    const signOutRedirect = () => {
        const clientId = "7ed028j7isbb9je8k6sung8764";
        const logoutUri = "http://localhost:5173/logout";
        const cognitoDomain = "https://eu-west-1qd3q3j768.auth.eu-west-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    return (
        <header
            className="sticky top-0 z-30 flex h-14 items-center gap-4
            border-b bg-background px-4 sm:static sm:h-auto sm:border-0
            sm:bg-transparent sm:px-6">

            {/*<div className="relative ml-auto flex-1 md:grow-0">*/}
            {/*    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>*/}
            {/*    <Input*/}
            {/*        type="search"*/}
            {/*        placeholder="Search..."*/}
            {/*        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"*/}
            {/*    />*/}
            {/*</div>*/}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Avatar>
                            <AvatarImage src={avatar} />
                            <AvatarFallback>{user?.name?.substring(0, 1) || user?.email?.substring(0, 1)} </AvatarFallback>
                        </Avatar>

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.name || user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => signOutRedirect()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;