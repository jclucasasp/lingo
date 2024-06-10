import MobileHeader from "@/components/mobile-header";
import Sidebar from "@/components/sidebar";

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <MobileHeader />
            <Sidebar classes="hidden lg:flex border-r-2 fixed" />
            <section className="lg:ml-[300px]">
                {children}
            </section>
        </>
    );
}