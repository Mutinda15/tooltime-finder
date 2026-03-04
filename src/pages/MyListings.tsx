import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, LogOut, Home, MapPin, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AddListingDialog from "@/components/AddListingDialog";

const MyListings = () => {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingHouse, setEditingHouse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else {
        setUser(session.user);
        fetchMyHouses(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchMyHouses = async (userId: string) => {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("landlord_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) setHouses(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    const { error } = await supabase.from("houses").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setHouses((prev) => prev.filter((h) => h.id !== id));
      toast({ title: "Deleted", description: "Listing removed successfully." });
    }
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    const { error } = await supabase.from("houses").update({ is_available: !current }).eq("id", id);
    if (!error) {
      setHouses((prev) => prev.map((h) => (h.id === id ? { ...h, is_available: !current } : h)));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getImageUrl = (path: string) => {
    const { data } = supabase.storage.from("house-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const onListingAdded = () => {
    if (user) fetchMyHouses(user.id);
    setShowAdd(false);
    setEditingHouse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <h1 className="text-3xl font-black text-foreground">My Listings</h1>
            <p className="text-muted-foreground">Manage your property listings</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => { setEditingHouse(null); setShowAdd(true); }} className="gap-2">
              <Plus className="w-4 h-4" /> Add Listing
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading...</div>
        ) : houses.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No listings yet</h3>
            <p className="text-muted-foreground mb-6">Start by adding your first property listing</p>
            <Button onClick={() => setShowAdd(true)} className="gap-2">
              <Plus className="w-4 h-4" /> Add Your First Listing
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <Card key={house.id} className="overflow-hidden border-0 shadow-lg">
                <div className="relative h-44 bg-muted">
                  {house.images && house.images.length > 0 ? (
                    <img src={getImageUrl(house.images[0])} alt={house.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-10 h-10 text-muted-foreground/30" />
                    </div>
                  )}
                  <Badge className={`absolute top-3 left-3 ${house.is_available ? "bg-green-500" : "bg-red-500"} text-primary-foreground`}>
                    {house.is_available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground mb-1">{house.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-3 h-3" /> {house.location}
                  </div>
                  <p className="text-lg font-black text-primary mb-4">
                    ${house.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/{house.price_period}</span>
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => toggleAvailability(house.id, house.is_available)}>
                      {house.is_available ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {house.is_available ? "Hide" : "Show"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => { setEditingHouse(house); setShowAdd(true); }}>
                      <Edit className="w-3 h-3" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive" onClick={() => handleDelete(house.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddListingDialog
        open={showAdd}
        onOpenChange={(open) => { setShowAdd(open); if (!open) setEditingHouse(null); }}
        onSuccess={onListingAdded}
        editingHouse={editingHouse}
      />
    </div>
  );
};

export default MyListings;
