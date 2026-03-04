import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  editingHouse?: any;
}

const AddListingDialog = ({ open, onOpenChange, onSuccess, editingHouse }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    price_period: "month",
    location: "",
    address: "",
    bedrooms: "1",
    bathrooms: "1",
    property_type: "apartment",
    furnished: false,
    parking: false,
    wifi: false,
    security: false,
    water_included: false,
    electricity_included: false,
    contact_phone: "",
    contact_email: "",
    contact_whatsapp: "",
  });

  useEffect(() => {
    if (editingHouse) {
      setForm({
        title: editingHouse.title || "",
        description: editingHouse.description || "",
        price: String(editingHouse.price || ""),
        price_period: editingHouse.price_period || "month",
        location: editingHouse.location || "",
        address: editingHouse.address || "",
        bedrooms: String(editingHouse.bedrooms || 1),
        bathrooms: String(editingHouse.bathrooms || 1),
        property_type: editingHouse.property_type || "apartment",
        furnished: editingHouse.furnished || false,
        parking: editingHouse.parking || false,
        wifi: editingHouse.wifi || false,
        security: editingHouse.security || false,
        water_included: editingHouse.water_included || false,
        electricity_included: editingHouse.electricity_included || false,
        contact_phone: editingHouse.contact_phone || "",
        contact_email: editingHouse.contact_email || "",
        contact_whatsapp: editingHouse.contact_whatsapp || "",
      });
      setImages(editingHouse.images || []);
    } else {
      resetForm();
    }
  }, [editingHouse, open]);

  const resetForm = () => {
    setForm({
      title: "", description: "", price: "", price_period: "month",
      location: "", address: "", bedrooms: "1", bathrooms: "1",
      property_type: "apartment", furnished: false, parking: false,
      wifi: false, security: false, water_included: false,
      electricity_included: false, contact_phone: "", contact_email: "", contact_whatsapp: "",
    });
    setImages([]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${session.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage.from("house-images").upload(path, file);
      if (!error) newImages.push(path);
    }

    setImages((prev) => [...prev, ...newImages]);
    setUploading(false);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const getImageUrl = (path: string) => {
    const { data } = supabase.storage.from("house-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Error", description: "You must be logged in", variant: "destructive" });
      setLoading(false);
      return;
    }

    const payload = {
      landlord_id: session.user.id,
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      price_period: form.price_period,
      location: form.location.trim(),
      address: form.address.trim() || null,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      property_type: form.property_type,
      furnished: form.furnished,
      parking: form.parking,
      wifi: form.wifi,
      security: form.security,
      water_included: form.water_included,
      electricity_included: form.electricity_included,
      contact_phone: form.contact_phone.trim() || null,
      contact_email: form.contact_email.trim() || null,
      contact_whatsapp: form.contact_whatsapp.trim() || null,
      images,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingHouse) {
      ({ error } = await supabase.from("houses").update(payload).eq("id", editingHouse.id));
    } else {
      ({ error } = await supabase.from("houses").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingHouse ? "Updated!" : "Listed!", description: "Your property listing has been saved." });
      onSuccess();
    }
    setLoading(false);
  };

  const update = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            {editingHouse ? "Edit Listing" : "Add New Listing"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Beautiful 2BR Apartment" required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description *</Label>
                <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe your property..." rows={3} required />
              </div>
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="500" required min="0" />
              </div>
              <div className="space-y-2">
                <Label>Price Period</Label>
                <Select value={form.price_period} onValueChange={(v) => update("price_period", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Per Month</SelectItem>
                    <SelectItem value="week">Per Week</SelectItem>
                    <SelectItem value="day">Per Day</SelectItem>
                    <SelectItem value="year">Per Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location *</Label>
                <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City, Area" required />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Full address (optional)" />
              </div>
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={form.property_type} onValueChange={(v) => update("property_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-6">
                <div className="space-y-2 flex-1">
                  <Label>Bedrooms</Label>
                  <Input type="number" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} min="0" />
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Bathrooms</Label>
                  <Input type="number" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} min="0" />
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: "furnished", label: "Furnished" },
                { key: "parking", label: "Parking" },
                { key: "wifi", label: "WiFi" },
                { key: "security", label: "Security" },
                { key: "water_included", label: "Water Included" },
                { key: "electricity_included", label: "Electricity Included" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-3">
                  <Switch checked={form[key as keyof typeof form] as boolean} onCheckedChange={(v) => update(key, v)} />
                  <Label className="cursor-pointer">{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Photos</h3>
            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                {uploading ? <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /> : <Upload className="w-5 h-5 text-muted-foreground" />}
                <span className="text-xs text-muted-foreground mt-1">Upload</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={form.contact_phone} onChange={(e) => update("contact_phone", e.target.value)} placeholder="+1234567890" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.contact_email} onChange={(e) => update("contact_email", e.target.value)} placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input value={form.contact_whatsapp} onChange={(e) => update("contact_whatsapp", e.target.value)} placeholder="+1234567890" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : editingHouse ? "Update Listing" : "Create Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingDialog;
