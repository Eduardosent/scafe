import { ExperiencesSection, Footer, GallerySection, Hero, Navbar, ReservationSection } from "@/components/landing";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <GallerySection />
            <ExperiencesSection />
            <ReservationSection />
            <Footer />
        </>
    )
}