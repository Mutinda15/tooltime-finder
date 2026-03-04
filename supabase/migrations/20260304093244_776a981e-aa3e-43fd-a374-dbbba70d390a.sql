
-- Houses/properties listing table
CREATE TABLE public.houses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  landlord_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  price_period TEXT NOT NULL DEFAULT 'month',
  location TEXT NOT NULL,
  address TEXT,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  property_type TEXT NOT NULL DEFAULT 'apartment',
  furnished BOOLEAN NOT NULL DEFAULT false,
  parking BOOLEAN NOT NULL DEFAULT false,
  wifi BOOLEAN NOT NULL DEFAULT false,
  security BOOLEAN NOT NULL DEFAULT false,
  water_included BOOLEAN NOT NULL DEFAULT false,
  electricity_included BOOLEAN NOT NULL DEFAULT false,
  contact_phone TEXT,
  contact_email TEXT,
  contact_whatsapp TEXT,
  images TEXT[] DEFAULT '{}',
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.houses ENABLE ROW LEVEL SECURITY;

-- Anyone can view available houses
CREATE POLICY "Anyone can view available houses"
  ON public.houses FOR SELECT
  USING (is_available = true);

-- Landlords can insert their own houses
CREATE POLICY "Landlords can insert own houses"
  ON public.houses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = landlord_id);

-- Landlords can update their own houses
CREATE POLICY "Landlords can update own houses"
  ON public.houses FOR UPDATE
  TO authenticated
  USING (auth.uid() = landlord_id)
  WITH CHECK (auth.uid() = landlord_id);

-- Landlords can delete their own houses
CREATE POLICY "Landlords can delete own houses"
  ON public.houses FOR DELETE
  TO authenticated
  USING (auth.uid() = landlord_id);

-- Storage bucket for house images
INSERT INTO storage.buckets (id, name, public)
VALUES ('house-images', 'house-images', true);

-- Anyone can view house images
CREATE POLICY "Anyone can view house images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'house-images');

-- Authenticated users can upload house images
CREATE POLICY "Authenticated users can upload house images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'house-images');

-- Users can delete their own uploads
CREATE POLICY "Users can delete own house images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'house-images' AND (storage.foldername(name))[1] = auth.uid()::text);
