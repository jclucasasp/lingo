"use client"
import { useExitModal } from "@/lib/utils";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Exitmodal() {
    
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, onOpen, onClose } = useExitModal();
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) return null;
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full">
                <DialogHeader className="flex items-center">
                    <div className="mb-4">
                        <Image src={"/mascot_sad.svg"} height={80} width={80} alt="sad mascot" />
                    </div>
                    <DialogTitle className="font-bold text-2xl">Wait, don&apos;t leave yet</DialogTitle>
                    <DialogDescription className="text-base">You&apos;re about to leave the lesson. Are you sure?</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2"> 
                <Button onClick={onClose}
                        size={"lg"}
                        variant={"secondary"}>
                        Continue Learning
                    </Button>
                    <Button onClick={()=> { onClose(); router.push("/learn") }}
                        size={"lg"}
                        variant={"primary"}>
                        Return to lessons
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}