import MobileHeader from "@/components/mobile-header";
import Sidebar from "@/components/sidebar";

type LayoutProps = {
    children: React.ReactNode;
}

const seed = ["first", "second", "third", "fouth"];

export default function Layout({ children }: LayoutProps) {
    return (
        <>
        <MobileHeader />
        <section className="flex h-screen">
            <Sidebar classes="hidden md:flex md:flex-col" />
            {children}
        </section>
        </>
    );
}