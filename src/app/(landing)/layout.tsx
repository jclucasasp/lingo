import Footer from "@/app/(landing)/footer";
import Header from "@/app/(landing)/header";

type Props = {
    children: React.ReactNode;
}

export default function MarketingLayout({ children }: Props) {
    return (
        <section className="min-h-screen flex flex-col bg-slate-100">
            <Header />
            <main className="flex flex-1 justify-center items-center">
                {children}
            </main>
            <Footer />
        </section>
    );
}