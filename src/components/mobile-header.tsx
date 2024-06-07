import MobileSidebar from "@/components/mobile-sidebar";

export default function MobileHeader() {
  return (
    <nav className="md:hidden flex items-center p-6 bg-green-500">
        <MobileSidebar/>
    </nav>
  );
}