import React from 'react';

const HeroSection: React.FC = () => {
  const handleAnalyticsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
      analyticsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-222 pb-16 md:pt-40 md:pb-24 bg-hero-pattern">
      {/* Gradient Orb Decorations */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-tritonexus-purple/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-tritonexus-pink/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Streamline Your Workflow with <span className="text-gradient">TritoNexus</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            The all-in-one platform for teams to collaborate, manage tasks,
            and track project progress in real-time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <a href="#features" onClick={handleFeaturesClick} className="btn-primary">
              Explore Features
            </a>
            <a href="#analytics" onClick={handleAnalyticsClick} className="btn-outline">
              View Analytics
            </a>
          </div>
          
          {/* Hero Image */}
          {/* <div className="mt-16 relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-20 bottom-0"></div>
            <div className="bg-gradient-to-r from-tritonexus-purple/5 to-tritonexus-pink/5 rounded-xl border border-muted p-2 shadow-xl">
              <div className="rounded-lg overflow-hidden border border-muted/80">
                <div className="bg-muted/30 h-8 w-full flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-tritonexus-pink/30"></div>
                  <div className="w-3 h-3 rounded-full bg-tritonexus-purple/30"></div>
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                </div>
                <div className="bg-background/80 h-[350px] md:h-[400px]">
                  <div className="grid grid-cols-6 h-full border-t border-muted">
                    <div className="col-span-1 border-r border-muted p-4">
                      <div className="h-5 bg-muted/50 rounded-md mb-3 w-4/5"></div>
                      <div className="h-4 bg-muted/40 rounded-md mb-3 w-3/4"></div>
                      <div className="h-4 bg-muted/40 rounded-md mb-3 w-2/3"></div>
                      <div className="h-4 bg-muted/40 rounded-md mb-3 w-4/5"></div>
                    </div>
                    <div className="col-span-5 p-6">
                      <div className="h-8 bg-muted/40 rounded-md mb-6 w-1/3"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-24 bg-tritonexus-purple/10 rounded-lg border border-tritonexus-purple/20"></div>
                        <div className="h-24 bg-tritonexus-pink/10 rounded-lg border border-tritonexus-pink/20"></div>
                        <div className="h-24 bg-muted/30 rounded-lg border border-muted"></div>
                      </div>
                      <div className="h-6 bg-muted/40 rounded-md mt-6 w-2/3 mb-4"></div>
                      <div className="h-4 bg-muted/20 rounded-md mb-3 w-full"></div>
                      <div className="h-4 bg-muted/20 rounded-md mb-3 w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
