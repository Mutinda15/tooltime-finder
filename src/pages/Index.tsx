import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import AboutPreview from "@/components/AboutPreview";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <TrustSection />
      <HowItWorks />
      <AboutPreview />
      <AppDownload />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;