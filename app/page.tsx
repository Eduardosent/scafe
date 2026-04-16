import { ExperiencesSection, Footer, GallerySection, Hero, Navbar, ReservationSection, SpotlightSection } from "@/components/landing";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <GallerySection />
            <SpotlightSection />
            <ExperiencesSection />
            <ReservationSection />
            <Footer />
        </>
    )
}