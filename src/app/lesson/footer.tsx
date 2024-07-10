import { useMedia, useKey } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type LessonFooterProps = {
    onCheck: () => void;
    status: "correct" | "incorrect" | "none" | "completed";
    disabled?: boolean;
    lessonId?: number;
}

export function LessonFooter({ onCheck, status, disabled, lessonId }: LessonFooterProps) {
    
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024x)");
    useKey("Enter", onCheck, {}, [onCheck]);
    
    return (
        <footer className={cn("w-full h-[100px] absolute -bottom-2 border-t-2", status === "correct" && "border-transparent, bg-green-100", status === "incorrect" && "border-transparent bg-rose-100")}>
            <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">

                {status === "correct" && (
                    <div className="flex items-center text-green-500 font-bold text-base lg:text-2xl">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
                        Correct
                    </div>
                )}
                {status === "incorrect" && (
                    <div className="flex items-center text-rose-500 font-bold text-base lg:text-2xl">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Incorrect
                    </div>
                )}
                {status === "completed" && (
                    <Button variant={"default"} size={isMobile ? "sm" : "lg"}
                    onClick={() => router.push(`/learn/${lessonId}`)}>
                        Practice Again
                    </Button>
                )}
                

                <Button className="ml-auto"
                disabled={disabled} onClick={onCheck}
                variant={status === "incorrect" ? "danger" : "secondary"}
                size={isMobile ? "sm" : "lg"}>
                    {status === "none" && "Check"}
                    {status === "correct" && "Next"}
                    {status === "incorrect" && "Retry"}
                    {status === "completed" && "Continue"}
                </Button>
            </div>
        </footer>
    );
}