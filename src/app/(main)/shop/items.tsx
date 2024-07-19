"use client"
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { POINTS_TO_REFILL } from "@/lib/constants";
import { refillHearts } from "@/../../actions/user-progress";
import Image from "next/image";
import { toast } from "sonner";

type ItemsProps = {
    hearts: number;
    points: number;
    subscription: boolean;
}

export default function Items({ hearts, points, subscription }: ItemsProps) {
    

    const [isPending, startTransition] = useTransition();
    const handleRefill = () => {
        if (points < POINTS_TO_REFILL || hearts === 5) {
            return;
        }

        startTransition(() => {
            refillHearts()
            .catch((err)=> toast.error(err.message));
        })
    }
  return (
    <ul className="w-full border-t-2 p-4">
        <div className="flex items-center gap-4">
            <Image src="/heart.svg" height={60} width={60} alt="hearts" />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">Refill hearts</p>
            </div>
            <Button disabled={points < POINTS_TO_REFILL || hearts === 5}
                onClick={handleRefill}>
                {hearts === 5 ? "full" : (
                    <div className="flex">
                        <Image src="/points.svg" alt="points" height={20} width={20} />
                        <p>{POINTS_TO_REFILL}</p>
                    </div>
                )}
            </Button>
        </div>
    </ul>
  );
}
