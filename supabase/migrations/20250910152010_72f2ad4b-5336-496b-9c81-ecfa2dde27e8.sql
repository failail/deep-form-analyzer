-- 1) Tighten RLS: drop overly-permissive policies added earlier
DROP POLICY IF EXISTS "Session owner can view own session" ON public.assessment_sessions;
DROP POLICY IF EXISTS "Anyone can create sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "Session owner can manage responses" ON public.assessment_responses;
DROP POLICY IF EXISTS "Session owner can manage results" ON public.assessment_results;

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Do NOT add permissive policies. Default deny for anon clients; access via SECURITY DEFINER RPCs below.

-- 2) Add safe constraints and indexes
CREATE UNIQUE INDEX IF NOT EXISTS uq_assessment_sessions_token ON public.assessment_sessions (session_token);
CREATE UNIQUE INDEX IF NOT EXISTS uq_assessment_responses_session_id ON public.assessment_responses (session_id);
CREATE UNIQUE INDEX IF NOT EXISTS uq_assessment_results_session_id ON public.assessment_results (session_id);

-- 3) Helper: robust session creation (upsert by token)
CREATE OR REPLACE FUNCTION public.create_session(token text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sid uuid;
BEGIN
  INSERT INTO public.assessment_sessions (session_token)
  VALUES (token)
  ON CONFLICT (session_token) DO UPDATE SET session_token = EXCLUDED.session_token
  RETURNING id INTO sid;
  RETURN sid;
END;
$$;

-- 4) Upsert responses for a session token
CREATE OR REPLACE FUNCTION public.upsert_assessment_response(token text, form_data jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sid uuid;
BEGIN
  SELECT id INTO sid FROM public.assessment_sessions WHERE session_token = token;
  IF sid IS NULL THEN
    sid := public.create_session(token);
  END IF;

  INSERT INTO public.assessment_responses (session_id, form_data)
  VALUES (sid, form_data)
  ON CONFLICT (session_id) DO UPDATE
    SET form_data = EXCLUDED.form_data,
        created_at = now();
END;
$$;

-- 5) Get saved response JSON by session token
CREATE OR REPLACE FUNCTION public.get_assessment_response(token text)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ar.form_data
  FROM public.assessment_responses ar
  JOIN public.assessment_sessions s ON s.id = ar.session_id
  WHERE s.session_token = token
  LIMIT 1;
$$;

-- 6) Upsert assessment results for a session token
CREATE OR REPLACE FUNCTION public.upsert_assessment_results(token text, results_data jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sid uuid;
BEGIN
  SELECT id INTO sid FROM public.assessment_sessions WHERE session_token = token;
  IF sid IS NULL THEN
    sid := public.create_session(token);
  END IF;

  INSERT INTO public.assessment_results (session_id, results_data)
  VALUES (sid, results_data)
  ON CONFLICT (session_id) DO UPDATE
    SET results_data = EXCLUDED.results_data,
        created_at = now();
END;
$$;

-- 7) Clear all assessment data for a session token
CREATE OR REPLACE FUNCTION public.clear_assessment_data(token text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sid uuid;
BEGIN
  SELECT id INTO sid FROM public.assessment_sessions WHERE session_token = token;
  IF sid IS NULL THEN
    RETURN; -- nothing to clear
  END IF;

  DELETE FROM public.assessment_responses WHERE session_id = sid;
  DELETE FROM public.assessment_results  WHERE session_id = sid;
END;
$$;