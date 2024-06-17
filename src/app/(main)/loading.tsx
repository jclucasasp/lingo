import { Skeleton } from "@/components/ui/skeleton";

export default function Loading()   {
    return (
        <div className="flex flex-1 m-auto h-screen gap-4">
            <Skeleton className="h-[200px] w-[217px] rounded-xl" />
        </div>
    );
}