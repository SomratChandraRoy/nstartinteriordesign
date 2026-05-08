import Layout from "../components/Layout";
import Hero from "../components/Hero";
import MarqueePublications from "../components/sections/MarqueePublications";
import Manifesto from "../components/sections/Manifesto";
import Blueprint from "../components/sections/Blueprint";
import BentoServices from "../components/sections/BentoServices";
import HorizontalPortfolio from "../components/sections/HorizontalPortfolio";
import PortfolioMobile from "../components/sections/PortfolioMobile";
import Testimonials from "../components/sections/Testimonials";
import CTASection from "../components/sections/CTASection";
import SEO, { schemas } from "../components/SEO";

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="NSID · Interior Design Firm Dhaka | Uttara"
        description="NorthStar Interior Design (NSID) is an interior design studio in Dhaka, Bangladesh, designing residential and corporate interiors."
        keywords={[
          "interior design firm dhaka",
          "turnkey corporate interior bangladesh",
          "premium space planning banani",
          "penthouse interior designer gulshan",
          "high end interior design dhanmondi",
          "commercial interior design dhaka",
          "best interior architect bangladesh",
          "NorthStar Interior Design",
          "NSID",
          "নর্থস্টার ইন্টেরিয়র ডিজাইন",
          "uttara interior designer",
          "interior design company in bangladesh",
          "best interior design firm in dhaka",
          "house interior design",
          "office interior design",
          "restaurant interior design",
        ]}
        canonical="https://nsid.bd/"
        image="https://raw.createusercontent.com/00785d2e-5b6d-4334-8dc5-4085206756a8/"
        schema={schemas.organization()}
      />
      <Hero />
      <MarqueePublications />
      <Manifesto />
      <Blueprint />
      <BentoServices />
      <HorizontalPortfolio />
      <PortfolioMobile />
      <Testimonials />
      <CTASection />
    </Layout>
  );
}
