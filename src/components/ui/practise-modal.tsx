"use client"
import { usePractiseModal } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function PractiseModal() {

    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, onOpen, onClose } = usePractiseModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex flex-col w-full items-center">
                <DialogHeader className="flex items-center">
                    <div className="mb-4">
                        <Image src={"/heart.svg"} height={100} width={100} alt="heart" />
                    </div>
                    <DialogTitle className="font-bold text-2xl">Practise Lesson</DialogTitle>
                    <DialogDescription className="text-base">By practising you can increase your hearts for each correct lesson</DialogDescription>
                </DialogHeader>
                <DialogFooter >
                    <Button onClick={ onClose } className="min-w-[200px]"
                        size={"lg"}
                        variant={"primary"}>
                        Continue
                    </Button>
                    <Button onClick={()=> { onClose(); router.push("/learn") }} className="min-w-[200px]"
                        size={"lg"}
                        variant={"secondary"}>
                        No Thanks
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}