import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import ChartSection from '../components/ChartSection';
import Footer from '../components/Footer';

const Index = () => {
  const location = useLocation();

  // Set page title on mount
  useEffect(() => {
    document.title = "TritoNexus - Streamline Your Workflow";
  }, []);

  // Handle scrolling to sections when navigating from other pages
  useEffect(() => {
    const scrollToSection = () => {
      const state = location.state as { scrollTo?: string };
      if (state?.scrollTo) {
        const element = document.getElementById(state.scrollTo);
        if (element) {
          // Add a small delay to ensure the page has loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    scrollToSection();
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <ChartSection />
        
        {/* Testimonial/CTA Section */}
        {/* <section id="testimonials" className="section bg-gradient-to-b from-muted/30 to-background">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Loved by <span className="text-gradient">Teams</span> Worldwide
              </h2>
              <p className="text-lg text-muted-foreground">
                See what our customers are saying about TritoNexus
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <div className="feature-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Product Manager at TechCorp</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "TritoNexus has revolutionized how our team collaborates. The real-time features and intuitive interface have boosted our productivity by at least 40%."
                </p>
              </div>
              
              <div className="feature-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-muted-foreground">CTO at StartupX</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The analytics features are game-changing. We can now track our project progress with precision and make data-driven decisions that have improved our delivery times."
                </p>
              </div>
              
              <div className="feature-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-tritonexus-purple to-tritonexus-pink rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Emily Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Team Lead at DesignWorks</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a design team, we needed something visual and flexible. TritoNexus's customizable workflows and intuitive interface have been exactly what we needed."
                </p>
              </div>
            </div>
            
            <div id="contact" className="max-w-4xl mx-auto bg-gradient-to-r from-tritonexus-purple/10 to-tritonexus-pink/10 rounded-2xl p-8 border border-muted">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Ready to Transform Your Workflow?
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of teams already using TritoNexus to boost productivity
                </p>
              </div>
              
              <form className="max-w-md mx-auto">
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-tritonexus-purple/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary py-3"
                >
                  Get Started Free
                </button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  No credit card required. Free 14-day trial.
                </p>
              </form>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
