import { Search, UserCheck, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description: "Find handymen in your area by service type, ratings, and availability"
  },
  {
    icon: UserCheck,
    title: "View Profiles & Ratings",
    description: "Check reviews, and ratings of previous work, and verify credentials"
  },
  {
    icon: Calendar,
    title: "Book Instantly & Request",
    description: "Schedule appointments or send service requests that fit your timeline with real-time availability"
  },
  {
    icon: CheckCircle,
    title: "Get Work Done",
    description: "Enjoy quality service from verified professionals with guaranteed satisfaction"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-foreground text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Get professional help in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="text-center group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Step number */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-black text-sm">
                  {index + 1}
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-primary/30 transform -translate-x-1/2"></div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-lg font-semibold">All handymen are background-checked and insured</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;