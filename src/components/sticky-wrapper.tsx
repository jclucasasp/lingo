type StickyProps = {
    children: React.ReactNode;
}

export default function StickyWrapper({ children }: StickyProps) {
    return (
        <div className="hidden lg:block w-[368px]">
            <div className="sticky top-0">
                {children}
            </div>
        </div>
    )
}
