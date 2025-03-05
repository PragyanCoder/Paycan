/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `specifications` (jsonb)
      - `price` (numeric)
      - `server_type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policies for public read access
    - Add policies for admin write access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  specifications jsonb,
  price numeric NOT NULL,
  server_type text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products are editable by admins only"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users
    WHERE auth.email() IN ('admin@arivyan.com')
  ));