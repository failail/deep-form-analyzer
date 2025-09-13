-- Add RLS policies to protect session tokens in assessment_sessions table
-- This prevents public access to session tokens while allowing legitimate operations through security definer functions

-- Policy to prevent all direct public access to assessment_sessions table
-- Since all legitimate access goes through security definer functions, we block direct table access
CREATE POLICY "Block all direct public access to session tokens" 
ON public.assessment_sessions 
FOR ALL 
USING (false);

-- Note: The existing security definer functions (validate_session_token, create_session, etc.) 
-- will continue to work because they bypass RLS due to their SECURITY DEFINER attribute.
-- This ensures legitimate session operations work while preventing unauthorized token access.