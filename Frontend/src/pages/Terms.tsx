import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TermsSection from "@/components/TermsSection";

const Terms = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-purple-300 hover:text-pink-300 hover:bg-white/5">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Header with gradient text */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 via-violet-300 to-pink-300 text-transparent bg-clip-text tracking-tight">
          Terms of Service
        </h1>
        
        {/* Subtitle with soft glow */}
        <p className="text-xl md:text-2xl text-center mb-12 text-purple-100 font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Please read these terms carefully before using our services.
        </p>

        {/* Content blocks */}
        <div className="space-y-6">
          {/* Introduction */}
          <TermsSection title="Introduction">
            <p>By using TritoNexus, you agree to these terms and conditions.</p>
            <p>These terms govern your use of our platform and services.</p>
          </TermsSection>

          {/* Account Terms */}
          <TermsSection title="Account Terms">
            <p>You must be 13 years or older to use this service.</p>
            <p>You are responsible for maintaining the security of your account.</p>
          </TermsSection>

          {/* Service Usage */}
          <TermsSection title="Service Usage">
            <p>Use our services in compliance with all applicable laws.</p>
            <p>Do not use our services for any illegal purposes.</p>
          </TermsSection>

          {/* Content Guidelines */}
          <TermsSection title="Content Guidelines">
            <p>You retain ownership of your content.</p>
            <p>You grant us license to use your content for service provision.</p>
          </TermsSection>

          {/* Payment Terms */}
          <TermsSection title="Payment Terms">
            <p>Subscription fees are billed in advance.</p>
            <p>Refunds are handled on a case-by-case basis.</p>
          </TermsSection>

          {/* Termination */}
          <TermsSection title="Termination">
            <p>We may terminate or suspend your account at any time.</p>
            <p>You can cancel your subscription at any time.</p>
          </TermsSection>

          {/* Changes to Terms */}
          <TermsSection title="Changes to Terms">
            <p>We may modify these terms at any time.</p>
            <p>We will notify you of significant changes.</p>
          </TermsSection>

          {/* Contact */}
          <TermsSection title="Contact">
            <p>For questions about these terms, contact us at:</p>
            <p className="text-purple-300">legal@tritonexus.tech</p>
          </TermsSection>
        </div>

        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>Last updated: May 10, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;