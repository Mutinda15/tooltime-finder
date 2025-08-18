import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wrench, 
  Paintbrush, 
  Zap, 
  Droplets, 
  Hammer, 
  Home,
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "General Repairs",
    description: "From fixing leaky faucets to assembling furniture, our handymen handle all your repair needs.",
    color: "text-blue-500"
  },
  {
    icon: Paintbrush,
    title: "Painting & Decorating",
    description: "Transform your space with professional painting services and interior decorating.",
    color: "text-purple-500"
  },
  {
    icon: Zap,
    title: "Electrical Work",
    description: "Licensed electricians for safe installation, repairs, and electrical maintenance.",
    color: "text-yellow-500"
  },
  {
    icon: Droplets,
    title: "Plumbing Services",
    description: "Expert plumbers for all your water, drainage, and pipe-related issues.",
    color: "text-cyan-500"
  },
  {
    icon: Hammer,
    title: "Carpentry",
    description: "Custom woodwork, repairs, and carpentry projects by skilled craftsmen.",
    color: "text-orange-500"
  },
  {
    icon: Home,
    title: "Home Improvement",
    description: "Complete renovation projects to upgrade and modernize your living space.",
    color: "text-green-500"
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-light to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From quick fixes to major renovations, find the right professional for every job
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg gradient-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-white rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;