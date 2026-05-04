import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import founderBg from "@/assets/founder-bg.jpg";

const AboutPreview = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div
            className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${founderBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm opacity-80">Meet</p>
              <p className="text-2xl font-bold">Our Founder</p>
            </div>
          </div>

          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Snipe
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Built to give you back your time
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Snipe Technologies connects everyday people and businesses with trusted
              service providers and riders. Hear from our founder, our users, and the
              clients who rely on us every day.
            </p>
            <Link to="/about">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
                Learn more about us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
