import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import founderBg from "@/assets/founder-bg.jpg";
import usersBg from "@/assets/users-bg.jpg";
import clientsBg from "@/assets/clients-bg.jpg";

const userTestimonials = [
  {
    name: "Brian Otieno",
    role: "Student, Nairobi",
    quote: "Snipe has made errands so easy. I can focus on school and still get groceries delivered the same hour!",
  },
  {
    name: "Mercy Wanjiku",
    role: "Working Mum",
    quote: "Honestly, I don't know how I survived before Snipe. The riders are kind, fast and reliable.",
  },
  {
    name: "Kevin Mensah",
    role: "Freelancer",
    quote: "From documents to lunch — Snipe handles everything. The app is smooth and the support is real.",
  },
];

const clientTestimonials = [
  {
    name: "Aisha Hassan",
    role: "Boutique Owner",
    quote: "My deliveries have tripled since partnering with Snipe. Their team treats my customers like their own.",
  },
  {
    name: "Daniel Kiprop",
    role: "Restaurant Manager",
    quote: "The dashboard is simple and the riders are professional. Snipe is a real growth partner for our business.",
  },
  {
    name: "Linda Achieng",
    role: "Pharmacy Director",
    quote: "Reliability is everything in our industry. Snipe delivers — every single time, on time.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Intro */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            We're building Africa's most trusted delivery network
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Snipe Technologies was born from a simple idea — that getting things done
            should never feel like a chore. From groceries to parcels, errands to
            business logistics, we connect people with reliable riders and trusted
            service providers in minutes. Fast, friendly, and built for everyday life.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section
        className="relative py-32 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${founderBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        <div className="relative container mx-auto max-w-5xl">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-medium mb-6">
              From Our Founder
            </span>
            <Quote className="w-12 h-12 text-primary mb-6" />
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
              "We didn't start Snipe to be just another delivery app. We started it
              because we saw hardworking people losing hours every day on small
              errands. Our mission is to give that time back — and turn every
              delivery into a moment of trust."
            </p>
            <div className="border-l-4 border-primary pl-4">
              <p className="text-xl font-semibold">The Founder</p>
              <p className="text-white/80">CEO, Snipe Technologies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Users Section */}
      <section
        className="relative py-24 px-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${usersBg})` }}
      >
        <div className="absolute inset-0 bg-background/92" />
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              What Our Users Say
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Loved by everyday people
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {userTestimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-lg bg-white/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section
        className="relative py-24 px-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${clientsBg})` }}
      >
        <div className="absolute inset-0 bg-gray-900/85" />
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-medium mb-4">
              What Our Clients Say
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Trusted by businesses across the region
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {clientTestimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-xl bg-white/95 backdrop-blur">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
