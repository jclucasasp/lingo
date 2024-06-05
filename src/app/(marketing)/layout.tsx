import Footer from "./footer";
import Header from "./header";

type Props = {
    children: React.ReactNode;
}

export default function MarketingLayout({ children }: Props) {
    return (
        <section className="min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-1 justify-center items-center">
                {children}
            </main>
            <Footer />
        </section>
    );
}