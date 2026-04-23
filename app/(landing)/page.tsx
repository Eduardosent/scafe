import { ExperiencesSection, Footer, GallerySection, Hero, ReservationSection, SpotlightSection } from "@/components/landing";

export default function Home() {
    return (
        <>
            <Hero />
            <SpotlightSection />
            <ExperiencesSection />
            <GallerySection />
            <ReservationSection />
            <Footer />
        </>
    )
}