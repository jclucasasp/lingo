"use client"
import { useHeartModal } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HeartModal() {

    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, onOpen, onClose } = useHeartModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex flex-col w-full items-center">
                <DialogHeader className="flex items-center">
                    <div className="mb-4">
                        <Image src={"/mascot_bad.svg"} height={80} width={80} alt="sad mascot" />
                    </div>
                    <DialogTitle className="font-bold text-2xl">You ran out of hearts!</DialogTitle>
                    <DialogDescription className="text-base">Upgrade to Pro for unlimited hearts</DialogDescription>
                </DialogHeader>
                <DialogFooter >
                    <Button onClick={() => { onClose(); router.push("/store") }} className="min-w-[200px]"
                        size={"lg"}
                        variant={"primary"}>
                        Get Pro
                    </Button>
                    <Button onClick={onClose} className="min-w-[200px]"
                        size={"lg"}
                        variant={"secondary"}>
                        No Thanks
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}