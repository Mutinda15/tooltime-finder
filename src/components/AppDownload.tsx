import { Button } from "@/components/ui/button";
import { Smartphone, Download, Star } from "lucide-react";

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
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Smartphone className="w-20 h-20 mx-auto mb-6 text-white/90" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Download the HandyWork App
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Get instant access to thousands of verified handymen in your area. 
              Available now on Google Play Store.
            </p>
          </div>
          
          {/* App Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">50K+</div>
              <div className="text-white/80">Downloads</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-3xl font-black text-white">4.9</span>
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
              </div>
              <div className="text-white/80">App Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-2">10K+</div>
              <div className="text-white/80">Professionals</div>
            </div>
          </div>
          
          {/* Download Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-primary font-black py-6 px-12 rounded-2xl text-lg shadow-2xl transform hover:scale-105 transition-all duration-200 border-2 border-white"
            >
              <Download className="w-6 h-6 mr-3" />
              Get it on Google Play
            </Button>
          </div>
          
          <p className="mt-6 text-white/70 text-sm">
            Free download • Available on Android
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;