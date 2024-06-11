import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "@/components/sidebar-item";
import UserButtonWrapper from "@/components/userbutton-wrapper";

type SidebarProps = {
    classes?: string,
}

export default function Sidebar({ classes }: SidebarProps) {
    return (
        <div className={cn("p-4 flex flex-col w-[256px] gap-4 h-screen", classes)}>
            <SidebarBrand />
            <SidebarItems />
            <UserButtonWrapper />
        </div>
    );
}

function SidebarBrand() {
    return (
        <Link href={"/learn"}>
            <div className="flex items-center gap-3">
                <Image src={"/mascot.svg"} height={40} width={40} alt="mascot picture" />
                <h1 className="text-2xl font-extrabold text-green-600">Lingo</h1>
            </div>
        </Link>
    );
}

function SidebarItems() {
    const items = [
        { label: "learn", iconSrc: "/learn.svg", href: "/learn" },
        { label: "leaderboard", iconSrc: "/leaderboard.svg", href: "/leaderboard" },
        { label: "quests", iconSrc: "/quests.svg", href: "/quests" },
        { label: "shop", iconSrc: "/shop.svg", href: "/shop" },
    ];

    return (
        <>
            {items.map((item, index) => (
                <SidebarItem key={index} {...item} />
            ))}
        </>
    );
}
