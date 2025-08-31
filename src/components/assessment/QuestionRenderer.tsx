import { UseFormReturn } from 'react-hook-form';
import { Question } from '@/types/assessment';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface QuestionRendererProps {
  question: Question;
  form: UseFormReturn<any>;
  questionIndex: number;
}

export const QuestionRenderer = ({ question, form, questionIndex }: QuestionRendererProps) => {
  const renderFormField = () => {
    switch (question.type) {
      case 'text':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  {questionIndex}. {question.title}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your answer"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'number':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  {questionIndex}. {question.title}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'date':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg font-medium">
                  {questionIndex}. {question.title}
                </FormLabel>
                <div className="flex gap-2">
                  <Select 
                    onValueChange={(value) => {
                      const [year, month] = (field.value || '').split('-');
                      field.onChange(`${year || new Date().getFullYear()}-${value}-01`);
                    }}
                    value={(field.value || '').split('-')[1] || ''}
                  >
                    <FormControl>
                      <SelectTrigger className="flex-1 bg-popover z-50">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border border-border max-h-60 overflow-y-auto z-50">
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = String(i + 1).padStart(2, '0');
                        const monthName = new Date(2024, i, 1).toLocaleString('default', { month: 'long' });
                        return (
                          <SelectItem key={month} value={month}>
                            {monthName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    onValueChange={(value) => {
                      const [, month] = (field.value || '').split('-');
                      field.onChange(`${value}-${month || '01'}-01`);
                    }}
                    value={(field.value || '').split('-')[0] || ''}
                  >
                    <FormControl>
                      <SelectTrigger className="flex-1 bg-popover z-50">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border border-border max-h-60 overflow-y-auto z-50">
                      {Array.from({ length: 80 }, (_, i) => {
                        const year = String(new Date().getFullYear() - i);
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'radio':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  {questionIndex}. {question.title}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-3 mt-4"
                  >
                    {question.options?.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`${question.id}-${option.value}`}
                        />
                        <Label 
                          htmlFor={`${question.id}-${option.value}`}
                          className="font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  {questionIndex}. {question.title}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-popover z-50">
                      <SelectValue placeholder="Please select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover border border-border max-h-60 overflow-y-auto z-50">
                    {question.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'monthYear':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  {questionIndex}. {question.title}
                </FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <Select 
                      onValueChange={(value) => {
                        const [year, month] = (field.value || '').split('-');
                        field.onChange(`${year || new Date().getFullYear()}-${value}`);
                      }}
                      value={(field.value || '').split('-')[1] || ''}
                    >
                      <SelectTrigger className="flex-1 bg-popover z-50">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = String(i + 1).padStart(2, '0');
                          const monthName = new Date(2024, i, 1).toLocaleString('default', { month: 'long' });
                          return (
                            <SelectItem key={month} value={month}>
                              {monthName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      onValueChange={(value) => {
                        const [, month] = (field.value || '').split('-');
                        field.onChange(`${value}-${month || '01'}`);
                      }}
                      value={(field.value || '').split('-')[0] || ''}
                    >
                      <SelectTrigger className="flex-1 bg-popover z-50">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => {
                          const year = String(new Date().getFullYear() - i);
                          return (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
      {renderFormField()}
    </div>
  );
};