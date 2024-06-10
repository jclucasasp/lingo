'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
    label: string,
    iconSrc: string,
    href: string,
}

export default function SidebarItem({ label, iconSrc, href }: SidebarProps) {
    const pathName = usePathname();
    const active = pathName.includes(href);
    return (
        <Button variant={ active? "side_outline" : "sidebar"} asChild className="justify-start gap-4">
            <Link href={href}>
            <Image src={iconSrc} height={20} width={20} alt="learn picture" />
            {label}
            </Link>
        </Button>
    );
}