import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { QuestionRenderer } from '@/components/assessment/QuestionRenderer';
import { Question, FormData } from '@/types/assessment';
import { getQuestionsForPage, getTotalPages, getProgressInfo } from '@/utils/groupLogic';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';


const Assessment = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [sessionToken, setSessionToken] = useState<string>('');
  const { toast } = useToast();

  // Save progress function
  const saveProgress = async (data: FormData) => {
    if (!sessionToken) return;
    
    try {
      await supabase
        .rpc('upsert_assessment_response', {
          token: sessionToken,
          form_data: data
        });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

// Create or get session token
useEffect(() => {
  const getOrCreateSession = async () => {
    let token = localStorage.getItem('assessmentSession');
    if (!token) {
      // Use crypto.randomUUID for better security
      token = `session_${Date.now()}_${crypto.randomUUID()}`;
      localStorage.setItem('assessmentSession', token);
      
      // Create session in database
      try {
        await supabase
          .rpc('create_session', { token });
      } catch (error) {
        console.error('Error creating session:', error);
      }
    }
    setSessionToken(token);
  };
  getOrCreateSession();
}, []);
  
  // Get current page questions and progress info
  const currentQuestions = useMemo(() => 
    getQuestionsForPage(formData, currentPage), 
    [formData, currentPage]
  );
  
  const totalPages = useMemo(() => getTotalPages(formData), [formData]);
  
  const progressInfo = useMemo(() => 
    getProgressInfo(formData, currentPage), 
    [formData, currentPage]
  );

  // Create dynamic schema based on current questions
  const createSchema = () => {
    const schemaFields: any = {};
    
    currentQuestions.forEach(question => {
      if (question.type === 'number') {
        if (question.required) {
          let fieldSchema = z.coerce.number({
            required_error: 'This field is required',
            invalid_type_error: 'Please enter a valid number'
          });
          
          // Add validation rules
          question.validation?.forEach(rule => {
            if (rule.type === 'min') {
              fieldSchema = fieldSchema.min(Number(rule.value), rule.message);
            } else if (rule.type === 'max') {
              fieldSchema = fieldSchema.max(Number(rule.value), rule.message);
            }
          });
          
          schemaFields[question.id] = fieldSchema;
        } else {
          schemaFields[question.id] = z.coerce.number().optional();
        }
      } else {
        if (question.required) {
          let fieldSchema = z.string().min(1, 'This field is required');
          
          // Add validation rules
          question.validation?.forEach(rule => {
            if (rule.type === 'minLength') {
              fieldSchema = fieldSchema.min(Number(rule.value), rule.message);
            } else if (rule.type === 'pattern' && rule.value instanceof RegExp) {
              fieldSchema = fieldSchema.regex(rule.value, rule.message);
            }
          });
          
          schemaFields[question.id] = fieldSchema;
        } else {
          schemaFields[question.id] = z.string().optional();
        }
      }
    });
    return z.object(schemaFields);
  };

  const form = useForm({
    resolver: zodResolver(createSchema()),
    defaultValues: formData
  });

  const onSubmit = async (data: any) => {
    // Merge current page data with existing form data
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    // Save to localStorage as backup
    localStorage.setItem('assessmentData', JSON.stringify(updatedFormData));

    // Save to Supabase
    await saveProgress(updatedFormData);

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Save final results to database
      try {
        await supabase
          .rpc('upsert_assessment_results', {
            token: sessionToken,
            results_data: updatedFormData
          });
        
        toast({
          title: "Assessment Complete!",
          description: "Your responses have been saved successfully.",
        });
      } catch (error) {
        console.error('Error saving final results:', error);
        toast({
          title: "Assessment Complete!",
          description: "Assessment completed (saved locally as backup).",
          variant: "destructive"
        });
      }
      
      // Navigate to results page
      navigate('/results', { state: { formData: updatedFormData, sessionToken } });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      if (!sessionToken) return;
      
      try {
        // Try to load from Supabase first
        const { data: savedData } = await supabase
          .rpc('get_assessment_response', { token: sessionToken });

        if (savedData) {
          setFormData(savedData as FormData);
          form.reset(savedData as FormData);
          return;
        }
      } catch (error) {
        console.log('No saved data in database, checking localStorage');
      }
      
      // Fallback to localStorage
      const savedData = localStorage.getItem('assessmentData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        form.reset(parsed);
      }
    };

    loadSavedData();
  }, [form, sessionToken]);

  // Clear saved data function
  const clearSavedData = async () => {
    localStorage.removeItem('assessmentData');
    localStorage.removeItem('assessmentSession');
    
    // Clear from database if session exists
    if (sessionToken) {
      try {
        await supabase
          .rpc('clear_assessment_data', { token: sessionToken });
      } catch (error) {
        console.error('Error clearing database data:', error);
      }
    }
    
    setFormData({});
    setCurrentPage(0);
    form.reset({});
    
    // Create new session
    const newToken = `session_${Date.now()}_${crypto.randomUUID()}`;
    localStorage.setItem('assessmentSession', newToken);
    setSessionToken(newToken);
    
    try {
      await supabase
        .rpc('create_session', { token: newToken });
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  };

  // Update form when page changes
  useEffect(() => {
    const currentValues = currentQuestions.reduce((acc, question) => {
      acc[question.id] = formData[question.id] || '';
      return acc;
    }, {} as any);
    form.reset(currentValues);
  }, [currentPage, formData, form]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const progress = progressInfo.progress;
  const startQuestionNumber = progressInfo.startQuestionNumber;
  const endQuestionNumber = progressInfo.endQuestionNumber;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">
                <span className="text-foreground">ManageMe</span>
                <span className="text-primary text-2xl">.</span>
                <span className="text-foreground">Money</span>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearSavedData}
                  type="button"
                >
                  Start Over
                </Button>
                <div className="text-sm text-muted-foreground">
                  Question {startQuestionNumber}{endQuestionNumber > startQuestionNumber && `‑${endQuestionNumber}`} of {progressInfo.totalQuestions}
                </div>
              </div>
            </div>
          
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <div className="text-right text-sm text-muted-foreground mt-1">
              {progress}% complete
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Financial Health Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {currentQuestions.map((question, index) => {
                const questionNumber = startQuestionNumber + index;
                return (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    form={form}
                    questionIndex={questionNumber}
                  />
                );
              })}

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </Button>

                  <Button type="submit">
                    {currentPage < totalPages - 1 ? 'Next' : 'Complete Assessment'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Assessment;