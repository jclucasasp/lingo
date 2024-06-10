import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "@/components/sidebar-item";
import { UserButton, UserProfile } from "@clerk/nextjs";

type SidebarProps = {
    classes?: string,
}

export default function Sidebar({ classes }: SidebarProps) {
    return (
        <div className={cn("p-4 flex flex-col w-[256px] gap-4 h-screen ", classes)}>
            <Link href={"/learn"}>
                <div className="flex items-center gap-3">
                    <Image src={"/mascot.svg"} height={40} width={40} alt="mascot picture" />
                    <h1 className="text-2xl font-extrabold text-green-600">Lingo</h1>
                </div>
            </Link>
            <SidebarItem label="learn" iconSrc="/learn.svg" href="/learn" />
            <SidebarItem label="leaderboard" iconSrc="/leaderboard.svg" href="/leaderboard" />
            <SidebarItem label="quests" iconSrc="/quests.svg" href="/quests" />
            <SidebarItem label="shop" iconSrc="/shop.svg" href="/shop" />
            <div className="ml-3">
                <UserButton showName afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            userButtonBox: {
                                flexDirection: "row-reverse",
                                color: "grey",
                                fontVariant: "unicase",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}