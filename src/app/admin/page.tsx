import dynamic from "next/dynamic";
import { checkRole } from "@/lib/utils"
import { Protect } from "@clerk/nextjs";

const Admin = dynamic(() => import("@/app/admin/react-admin"), { ssr: false });

export default function page() {
    return (
        <Protect condition={() => checkRole("admin")} fallback={<p>Not authorized</p>}>
            <Admin />
        </Protect>
    );
}
