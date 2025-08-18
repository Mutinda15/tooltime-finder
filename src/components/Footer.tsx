import { Wrench, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black">HandyWork Technologies</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              Connecting homeowners with skilled professionals for all their home improvement needs. 
              Quality work, trusted reviews, instant booking.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-primary" />
                <span>contact@handywork.tech</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-white/80">
              <li className="hover:text-primary transition-colors cursor-pointer">General Repairs</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Painting</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Electrical</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Plumbing</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Carpentry</li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-6">Company</h3>
            <ul className="space-y-3 text-white/80">
              <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-primary transition-colors cursor-pointer">How It Works</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 HandyWork Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;