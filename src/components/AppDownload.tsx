import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Download, Star, Award } from "lucide-react";

const AppDownload = () => {
  return (
    <section className="py-24 gradient-primary text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-10 animate-float">
        <Smartphone className="w-32 h-32 text-white/10" />
      </div>
      <div className="absolute bottom-10 left-10 animate-float" style={{ animationDelay: '3s' }}>
        <Download className="w-24 h-24 text-white/10" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            Download Our Apps
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Whether you're looking for services or providing them, we have an app for you.
          </p>
        </div>

        {/* Two Apps Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* HandyWorks App for Users */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-white hover:bg-white/15 transition-all duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 p-2">
                <img src="/lovable-uploads/c96c8813-f0d6-47df-b857-f83adbf861cf.png" alt="Snipe Work" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Snipe Work</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                For homeowners and clients. Find and book trusted handymen for all your home improvement needs.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>50K+ Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>4.9 Rating</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-white text-primary hover:bg-white/90 font-bold"
              >
                <Download className="w-5 h-5 mr-2" />
                Get on Google Play
              </Button>
              <p className="mt-3 text-sm text-white/60">Coming Soon</p>
            </div>
          </Card>

          {/* Handyman App for Service Providers */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-white hover:bg-white/15 transition-all duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 p-2">
                <img src="/lovable-uploads/c96c8813-f0d6-47df-b857-f83adbf861cf.png" alt="Snipe Provider" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Snipe Provider</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                For service providers. Grow your business, manage bookings, and connect with clients in your area.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>10K+ Pros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>4.8 Rating</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-white text-primary hover:bg-white/90 font-bold"
              >
                <Download className="w-5 h-5 mr-2" />
                Get on Google Play
              </Button>
              <p className="mt-3 text-sm text-white/60">Coming Soon</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;