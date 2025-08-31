import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { QuestionRenderer } from '@/components/assessment/QuestionRenderer';
import { QUESTIONS } from '@/data/questions';
import { Question, FormData } from '@/types/assessment';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  
  // Filter questions based on conditional logic
  const getVisibleQuestions = (): Question[] => {
    return QUESTIONS.filter(question => {
      if (!question.conditional) return true;
      
      const dependentValue = formData[question.conditional.dependsOn];
      return question.conditional.values.includes(dependentValue);
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const questionsPerPage = 10;
  const totalPages = Math.ceil(visibleQuestions.length / questionsPerPage);
  const currentQuestions = visibleQuestions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
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

  const onSubmit = (data: any) => {
    // Merge current page data with existing form data
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    // Auto-save (in a real app, this would save to localStorage or API)
    localStorage.setItem('assessmentData', JSON.stringify(updatedFormData));

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Navigate to results page
      navigate('/results', { state: { formData: updatedFormData } });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('assessmentData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);
      form.reset(parsed);
    }
  }, [form]);

  // Update form when page changes
  useEffect(() => {
    const currentValues = currentQuestions.reduce((acc, question) => {
      acc[question.id] = formData[question.id] || '';
      return acc;
    }, {} as any);
    
    form.reset(currentValues);
  }, [currentPage, form, currentQuestions, formData]);

  const progress = Math.round(((currentPage + 1) / totalPages) * 100);
  const currentQuestionNumber = currentPage * questionsPerPage + 1;
  const endQuestionNumber = Math.min((currentPage + 1) * questionsPerPage, visibleQuestions.length);

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
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionNumber}{endQuestionNumber > currentQuestionNumber && `‑${endQuestionNumber}`} of {visibleQuestions.length}
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
                {currentQuestions.map((question, index) => (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    form={form}
                    questionIndex={currentPage * questionsPerPage + index + 1}
                  />
                ))}

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