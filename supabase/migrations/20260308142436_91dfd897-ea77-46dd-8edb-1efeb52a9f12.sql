
-- Since we're using password-only auth (no Supabase auth), we need to allow anon access for product CRUD
-- Drop the old admin-only policies
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

-- Allow all operations (admin access is gated by the password-protected dashboard)
CREATE POLICY "Allow insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update products" ON public.products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete products" ON public.products FOR DELETE USING (true);

-- Storage: allow anon uploads and deletes too
DROP POLICY IF EXISTS "Admins can upload digital products" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete digital products" ON storage.objects;

CREATE POLICY "Allow upload digital products" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'digital-products');

CREATE POLICY "Allow delete digital products" ON storage.objects
  FOR DELETE USING (bucket_id = 'digital-products');
