import { Navbar } from "@/components/landing";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}