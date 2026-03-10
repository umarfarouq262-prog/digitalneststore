ALTER TABLE public.products 
ADD COLUMN product_type text NOT NULL DEFAULT 'my_product',
ADD COLUMN affiliate_url text;