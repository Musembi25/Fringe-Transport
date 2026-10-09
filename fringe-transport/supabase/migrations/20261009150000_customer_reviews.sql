-- Fringe Transport: customer reviews.
-- No sample or seed reviews are inserted by this migration.

CREATE TABLE IF NOT EXISTS public.customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL
    CHECK (char_length(btrim(customer_name)) BETWEEN 2 AND 80),
  service_name text
    CHECK (service_name IS NULL OR char_length(service_name) <= 120),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL
    CHECK (char_length(btrim(comment)) BETWEEN 10 AND 1500),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read approved customer reviews"
  ON public.customer_reviews;
CREATE POLICY "Anyone can read approved customer reviews"
  ON public.customer_reviews
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved' OR (SELECT public.is_fringe_admin()));

DROP POLICY IF EXISTS "Anyone can submit pending customer reviews"
  ON public.customer_reviews;
CREATE POLICY "Anyone can submit pending customer reviews"
  ON public.customer_reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND char_length(btrim(customer_name)) BETWEEN 2 AND 80
    AND char_length(btrim(comment)) BETWEEN 10 AND 1500
    AND rating BETWEEN 1 AND 5
  );

DROP POLICY IF EXISTS "Fringe admins can moderate customer reviews"
  ON public.customer_reviews;
CREATE POLICY "Fringe admins can moderate customer reviews"
  ON public.customer_reviews
  FOR UPDATE
  TO authenticated
  USING ((SELECT public.is_fringe_admin()))
  WITH CHECK ((SELECT public.is_fringe_admin()));

DROP POLICY IF EXISTS "Fringe admins can delete customer reviews"
  ON public.customer_reviews;
CREATE POLICY "Fringe admins can delete customer reviews"
  ON public.customer_reviews
  FOR DELETE
  TO authenticated
  USING ((SELECT public.is_fringe_admin()));

GRANT SELECT, INSERT ON public.customer_reviews TO anon, authenticated;
GRANT UPDATE, DELETE ON public.customer_reviews TO authenticated;

CREATE INDEX IF NOT EXISTS customer_reviews_approved_created_at_idx
  ON public.customer_reviews (created_at DESC)
  WHERE status = 'approved';

CREATE INDEX IF NOT EXISTS customer_reviews_status_created_at_idx
  ON public.customer_reviews (status, created_at DESC);
