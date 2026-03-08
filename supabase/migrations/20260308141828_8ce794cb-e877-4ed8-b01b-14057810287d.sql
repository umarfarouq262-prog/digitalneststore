
-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  file_url TEXT,
  category TEXT NOT NULL DEFAULT 'PDF',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin-only policies for products
CREATE POLICY "Admins can insert products" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON public.products
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" ON public.products
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- User roles: admins can read roles, users can read own
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Storage bucket for digital product files
INSERT INTO storage.buckets (id, name, public)
VALUES ('digital-products', 'digital-products', true);

-- Storage policies
CREATE POLICY "Anyone can read digital products" ON storage.objects
  FOR SELECT USING (bucket_id = 'digital-products');

CREATE POLICY "Admins can upload digital products" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'digital-products' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete digital products" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'digital-products' AND public.has_role(auth.uid(), 'admin'));
