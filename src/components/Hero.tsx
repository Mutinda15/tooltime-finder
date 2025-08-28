import { Button } from "@/components/ui/button";
import { Play, Download, Star, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-handyman-tools.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional handyman with tools" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Find <span className="text-black bg-white/10 px-4 py-2 rounded-2xl">Skilled</span>
            <br />
            Handymen Near You
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light leading-relaxed">
            Connect with verified professionals for all your home improvement needs. 
            Quality work, trusted reviews, instant booking.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span className="font-semibold">10,000+ Handymen</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="font-semibold">Verified Pros</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-white font-bold py-6 px-8 rounded-xl text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Download className="w-6 h-6 mr-3" />
              Download App
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-6 px-8 rounded-xl text-lg backdrop-blur-sm bg-white/10"
            >
              <Play className="w-6 h-6 mr-3" />
              Watch Demo
            </Button>
          </div>
          
          <p className="mt-6 text-white/70">
            Available on Google Play Store
          </p>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default Hero;