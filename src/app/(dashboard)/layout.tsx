import BadgeProvider from "@/app/(dashboard)/BadgeProvider";

export default function DashboardLayout ({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <>
            <div className="mt-[4.5rem] ml-4">
                <BadgeProvider />
            </div>
            {children}
        </>
    )
}