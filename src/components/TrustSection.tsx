import { Shield, Lock, CreditCard, CheckCircle } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All handymen are background-checked and verified for your safety",
  },
  {
    icon: Lock,
    title: "Secure In-App Payments",
    description: "All payments are processed securely through our encrypted app platform",
  },
  {
    icon: CreditCard,
    title: "Protected Transactions",
    description: "Your payment information is never stored and fully protected",
  },
  {
    icon: CheckCircle,
    title: "Satisfaction Guaranteed",
    description: "Money-back guarantee if you're not completely satisfied with the service",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            Why <span className="text-primary">Trust Us</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your safety and security are our top priorities. Here's how we protect you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center p-6 rounded-2xl bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto mb-4 p-4 bg-blue-500/20 rounded-2xl w-fit">
                <feature.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            <span className="text-primary font-semibold">Bank-level encryption</span> • 
            <span className="text-primary font-semibold"> SSL secured</span> • 
            <span className="text-primary font-semibold"> PCI compliant</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;