/*
  # Create projects table

  1. New Tables
    - `projects` - Stores all project information
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `logo` (text)
      - `banner_image` (text)
      - `token_symbol` (text)
      - `token_price` (numeric)
      - `total_raise` (numeric)
      - `progress` (numeric)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `status` (text)
      - `min_investment` (numeric)
      - `max_investment` (numeric)
      - `total_supply` (numeric)
      - `initial_market_cap` (numeric)
      - `vesting_schedule` (text)
      - `refund_policy` (text)
      - `socials` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE projects (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  logo text NOT NULL,
  banner_image text NOT NULL,
  token_symbol text NOT NULL,
  token_price numeric NOT NULL,
  total_raise numeric NOT NULL,
  progress numeric NOT NULL DEFAULT 0,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('upcoming', 'live', 'ended')),
  min_investment numeric NOT NULL,
  max_investment numeric NOT NULL,
  total_supply numeric NOT NULL,
  initial_market_cap numeric NOT NULL,
  vesting_schedule text NOT NULL,
  refund_policy text NOT NULL,
  socials jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Projects can be inserted by authenticated users"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Projects can be updated by authenticated users"
  ON projects FOR UPDATE
  TO authenticated
  USING (true);