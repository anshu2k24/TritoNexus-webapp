import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Section component with glassmorphism styling
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:bg-white/10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-300 via-violet-200 to-pink-300 text-transparent bg-clip-text">{title}</h2>
      <div className="space-y-3 text-lg text-purple-50/90 font-light">
        {children}
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>
        
        {/* Subtitle with soft glow */}
        <p className="text-xl md:text-2xl text-center mb-12 text-purple-100 font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Your trust matters. Here's how we handle your data.
        </p>

        {/* Content blocks */}
        <div className="space-y-6">
          <Section title="Information We Collect">
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Usage data and preferences</li>
              <li>Communication history</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the collected information to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Send important updates</li>
              <li>Respond to your requests</li>
            </ul>
          </Section>

          <Section title="Data Security">
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
          </Section>

          <Section title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request data deletion</li>
              <li>Opt-out of communications</li>
            </ul>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="text-purple-300">privacy@tritonexus.tech</p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;