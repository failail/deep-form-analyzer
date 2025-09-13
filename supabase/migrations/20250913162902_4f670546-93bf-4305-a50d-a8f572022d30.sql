-- Enable Row Level Security on assessment_responses table
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;

-- Block all direct public access to assessment responses
-- This forces all access to go through the security definer functions
CREATE POLICY "Block all direct public access to assessment responses"
ON public.assessment_responses
FOR ALL
TO public
USING (false)
WITH CHECK (false);

-- Enable Row Level Security on assessment_results table for consistency  
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Block all direct public access to assessment results
CREATE POLICY "Block all direct public access to assessment results"
ON public.assessment_results  
FOR ALL
TO public
USING (false)
WITH CHECK (false);