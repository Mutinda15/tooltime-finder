-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading (for admin purposes)
CREATE POLICY "Anyone can view subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);