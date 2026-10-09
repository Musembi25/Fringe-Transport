DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_class
    WHERE oid = 'public.bookings'::regclass
      AND relrowsecurity
  ) THEN
    RAISE EXCEPTION
      'Row-level security must be enabled on public.bookings before granting delete access.';
  END IF;
END
$$;

GRANT DELETE ON TABLE public.bookings TO authenticated;

DROP POLICY IF EXISTS fringe_admins_can_delete_bookings ON public.bookings;
CREATE POLICY fringe_admins_can_delete_bookings
  ON public.bookings
  FOR DELETE
  TO authenticated
  USING ((SELECT public.is_fringe_admin()));

DROP POLICY IF EXISTS restrict_booking_deletes_to_fringe_admins ON public.bookings;
CREATE POLICY restrict_booking_deletes_to_fringe_admins
  ON public.bookings
  AS RESTRICTIVE
  FOR DELETE
  TO authenticated
  USING ((SELECT public.is_fringe_admin()));
