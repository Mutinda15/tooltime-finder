import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search, MapPin, Bed, Bath, Phone, Mail, MessageCircle,
  Home, Wifi, Car, Shield, Droplets, Zap, SlidersHorizontal,
  ArrowLeft
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface House {
  id: string;
  title: string;
  description: string;
  price: number;
  price_period: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  furnished: boolean;
  parking: boolean;
  wifi: boolean;
  security: boolean;
  water_included: boolean;
  electricity_included: boolean;
  contact_phone: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  images: string[];
  created_at: string;
}

const Houses = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setHouses(data as House[]);
    }
    setLoading(false);
  };

  const filtered = houses.filter((h) => {
    const matchesSearch =
      !search ||
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = propertyType === "all" || h.property_type === propertyType;
    const matchesMin = !minPrice || h.price >= Number(minPrice);
    const matchesMax = !maxPrice || h.price <= Number(maxPrice);
    return matchesSearch && matchesType && matchesMin && matchesMax;
  });

  const getImageUrl = (path: string) => {
    const { data } = supabase.storage.from("house-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const amenities = (h: House) => {
    const list = [];
    if (h.furnished) list.push({ icon: Home, label: "Furnished" });
    if (h.wifi) list.push({ icon: Wifi, label: "WiFi" });
    if (h.parking) list.push({ icon: Car, label: "Parking" });
    if (h.security) list.push({ icon: Shield, label: "Security" });
    if (h.water_included) list.push({ icon: Droplets, label: "Water" });
    if (h.electricity_included) list.push({ icon: Zap, label: "Electricity" });
    return list;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Find Your Perfect <span className="text-primary">Home</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse verified property listings from trusted landlords
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl shadow-lg p-6 mb-10 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input placeholder="Min $" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <Input placeholder="Max $" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading listings...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Home className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No listings found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((house) => (
                <Card key={house.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  {/* Image */}
                  <div className="relative h-52 bg-muted overflow-hidden">
                    {house.images && house.images.length > 0 ? (
                      <img
                        src={getImageUrl(house.images[0])}
                        alt={house.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {house.property_type}
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-foreground line-clamp-1">{house.title}</h3>
                      <span className="text-lg font-black text-primary whitespace-nowrap ml-2">
                        ${house.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/{house.price_period}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {house.location}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{house.description}</p>

                    {/* Beds & Baths */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-foreground">
                      <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-primary" /> {house.bedrooms} Bed{house.bedrooms > 1 ? "s" : ""}</span>
                      <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-primary" /> {house.bathrooms} Bath{house.bathrooms > 1 ? "s" : ""}</span>
                    </div>

                    {/* Amenities */}
                    {amenities(house).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {amenities(house).map((a) => (
                          <Badge key={a.label} variant="secondary" className="text-xs gap-1">
                            <a.icon className="w-3 h-3" /> {a.label}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Contact */}
                    <div className="flex gap-2 pt-3 border-t border-border">
                      {house.contact_phone && (
                        <a href={`tel:${house.contact_phone}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                            <Phone className="w-3 h-3" /> Call
                          </Button>
                        </a>
                      )}
                      {house.contact_whatsapp && (
                        <a href={`https://wa.me/${house.contact_whatsapp.replace(/\D/g, "")}`} target="_blank" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                            <MessageCircle className="w-3 h-3" /> WhatsApp
                          </Button>
                        </a>
                      )}
                      {house.contact_email && (
                        <a href={`mailto:${house.contact_email}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                            <Mail className="w-3 h-3" /> Email
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Houses;
