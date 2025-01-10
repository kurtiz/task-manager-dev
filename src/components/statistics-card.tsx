import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";


const StatisticsCard = ({...props}) => {
    const {stats, title, description, icon, isLoading} = props;
    return (
        <Card className="h-[25vh] py-6 motion-preset-slide-right  motion-delay-75">
            <CardContent>
                <CardTitle className="text-lg md:text-2xl font-bold">{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
                <div className="flex justify-between items-center">
                    {icon}
                    {
                        (isLoading) ?
                            <Skeleton className="h-16 w-[100px]"/> :
                            <p className="text-6xl font-black">{stats}</p>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default StatisticsCard;