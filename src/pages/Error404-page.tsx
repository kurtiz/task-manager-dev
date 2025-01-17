import {Button} from "@/components/ui/button.tsx";

const Error404Page = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center">
                <p className="text-[150px] font-black">404</p>
                <p className="text-xl mb-4">Page Not Found</p>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        </div>
    );
};

export default Error404Page;