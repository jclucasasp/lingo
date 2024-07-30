"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Promo() {
    const router = useRouter();
    
    return (
        <section className="border-2 rounded-xl p-4 mt-8">
            <div className="">
                <div className="flex items-center gap-2">
                    <Image src={"/unlimited.svg"} height={26} width={26} alt="unlimited" />
                    <h3 className="font-bold">Upgrade to Pro</h3>
                </div>
                <p className="text-muted-foreground">Get unlimited hearts and more!</p>
            </div>
            <Button variant={"super"} className="w-full mt-4" onClick={()=> router.push("/shop")}>Get it Now</Button>
        </section>
    )
}
