import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <HowItWorks />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Index;