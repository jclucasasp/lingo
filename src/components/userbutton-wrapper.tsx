import { UserButton } from "@clerk/nextjs";

export default function UserButtonWrapper() {
    return (
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
    );
}