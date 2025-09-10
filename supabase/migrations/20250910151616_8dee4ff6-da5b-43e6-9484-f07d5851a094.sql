-- Enable Row Level Security on all assessment tables
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Create policies for assessment_sessions
-- Allow anyone to create new sessions
CREATE POLICY "Anyone can create sessions" 
ON public.assessment_sessions 
FOR INSERT 
WITH CHECK (true);

-- Allow access to sessions based on session_token (for session-based access)
CREATE POLICY "Session owner can view own session" 
ON public.assessment_sessions 
FOR SELECT 
USING (true); -- Note: We'll need to handle this in the application layer since we can't authenticate session tokens in RLS

-- Create policies for assessment_responses
-- Allow session owner to insert/update their responses
CREATE POLICY "Session owner can manage responses" 
ON public.assessment_responses 
FOR ALL 
USING (true) -- For now, allowing all access - will be secured through application logic
WITH CHECK (true);

-- Create policies for assessment_results  
-- Allow session owner to manage their results
CREATE POLICY "Session owner can manage results" 
ON public.assessment_results 
FOR ALL 
USING (true) -- For now, allowing all access - will be secured through application logic
WITH CHECK (true);

-- Create a function to validate session tokens (for future enhancement)
CREATE OR REPLACE FUNCTION public.validate_session_token(token text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.assessment_sessions 
    WHERE session_token = token
  );
$$;