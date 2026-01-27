import Hero from '../pages/Hero';
import StatsBar from '../components/StatsBar';
import CarouselSection from '../components/CarouselSection';
import HowItWorks from '../components/HowItWorks';
import Impact from '../components/Impact';
import FAQ from '../components/FAQ';

export default function Home() {
    return (
        <div className="w-full overflow-hidden">
            <Hero />
            <StatsBar />
            <CarouselSection />
            <HowItWorks />
            <Impact />
            <FAQ />
        </div>
    );
}
