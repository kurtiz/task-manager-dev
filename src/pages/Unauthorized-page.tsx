import {Button} from "@/components/ui/button.tsx";

const UnauthorizedPage = () => {
    return (
        <div className="flex w-full h-[70vh] justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">
                <div className="flex flex-col w-full motion-preset-expand">
                    <div className="flex flex-col items-center">
                        <p className="text-[150px] font-black">401</p>
                        <p className="text-xl mb-4">Unauthorized</p>
                        <Button onClick={() => window.history.back()}>Go Back</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;