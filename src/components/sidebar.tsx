import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
    classes?: string,
    children?: string[],
}

export default function Sidebar({ classes, children }: SidebarProps) {
    return (
        <div className={cn("p-4 md:w-[256px]", classes)}>
            <Link href={"/learn"}>
            <div className="flex items-center gap-3">
                <Image src={"/mascot.svg"} height={40} width={40} alt="mascot picture" />
                <h1 className="text-2xl font-extrabold text-green-600">Lingo</h1>
            </div>
            </Link>
        </div>

    );
}