import { Wrench, Mail, Phone, MapPin } from "lucide-react";
import { FaTiktok, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-black">Snipe Technologies</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              Connecting homeowners with skilled professionals for all their home improvement needs. 
              Quality work, trusted reviews, instant booking.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <FaTiktok className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <FaLinkedin className="w-5 h-5 text-white" />
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@snipetech.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-primary" />
                <span>+254 000 000 </span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-primary" />
                <span>United Kingdom</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Nairobi, kenya</span>
              </div>
            </div>
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

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-white/80 mb-4">
              Subscribe to get updates on our latest services and offers.
            </p>
            <div className="flex flex-col gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2025 Snipe Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;