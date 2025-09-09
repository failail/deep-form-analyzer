import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-2xl font-bold font-manrope">
            <span className="text-foreground">ManageMe</span>
            <span className="text-primary" style={{ fontSize: '1.2em' }}>.</span>
            <span className="text-foreground">Money</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hero Section */}
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Your Financial Health Checkup Starts Here
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            15-20 minutes to understand where you stand and what to do next
          </p>

          {/* CTA Button */}
          <Button 
            onClick={() => navigate("/assessment")}
            size="lg"
            className="mb-16 px-12 py-6 text-lg font-medium"
          >
            Start My Financial Checkup
          </Button>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Complete financial health assessment across 12 key metrics
              </h3>
              <p className="text-muted-foreground">
                Get a comprehensive view of your financial situation with detailed analysis of your expenses, debts, savings, and investments.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Personalised recommendations based on your situation
              </h3>
              <p className="text-muted-foreground">
                Receive tailored advice and actionable steps designed specifically for your financial circumstances and goals.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Professional report you can save and share
              </h3>
              <p className="text-muted-foreground">
                Download a comprehensive PDF report with all your results and recommendations that you can reference anytime.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">
                No financial jargon - just clear, actionable guidance
              </h3>
              <p className="text-muted-foreground">
                Everything is explained in plain English with practical steps you can take to improve your financial health immediately.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2024 ManageMe.Money. Professional financial health assessment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
