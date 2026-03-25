-- Create publications table
CREATE TABLE public.publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  abstract TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Other',
  type TEXT NOT NULL CHECK (type IN ('journal', 'newsletter', 'resource')),
  file_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- Anyone can read published publications
CREATE POLICY "Anyone can view published publications"
  ON public.publications FOR SELECT
  USING (published = true);

-- Anyone can submit publications
CREATE POLICY "Anyone can submit publications"
  ON public.publications FOR INSERT
  WITH CHECK (true);

-- Create storage bucket for publication files
INSERT INTO storage.buckets (id, name, public) VALUES ('publications', 'publications', true);

CREATE POLICY "Anyone can upload publication files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'publications');

CREATE POLICY "Anyone can view publication files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'publications');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON public.publications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();