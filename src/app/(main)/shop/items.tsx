"use client"
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/lib/constants";
import { refillHearts } from "@/../../actions/user-progress";
import { createStripeUrl } from "@/../../actions/user-subscription";
import { useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ItemsProps = {
    hearts: number;
    points: number;
    subscription: boolean;
}

export default function Items({ hearts, points, subscription }: ItemsProps) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const handleRefill = () => {
        if (points < POINTS_TO_REFILL || hearts === 5) {
            return;
        }

        startTransition(() => {
            refillHearts()
                .catch((err) => toast.error(err.message));
        })
    }

    const handleSubscription = () => {
        startTransition(() => {
            createStripeUrl()
            .then((res) => {
                if (res?.data) {
                    router.push(res.data);
                    // window.location.href = res.data;
                }
            }).catch((err) => toast.error(err.message));
        });
    }

    return (
        <ul className="border-t-2 w-full">
            <div className="flex items-center gap-4 p-8">
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
            <div className="flex items-center gap-4 p-8 border-t-2 ">
                <Image src={"/unlimited.svg"} height={60} width={60} alt="unlimited" />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited hearts
                    </p>
                </div>
                <Button onClick={handleSubscription} disabled={isPending}>
                    {subscription ? "settings" : "upgrade"}
                </Button>
            </div>
        </ul>
    );
}
