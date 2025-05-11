import React from "react";
import { Card } from "@/components/ui/card";

interface TermsSectionProps {
  title: string;
  children: React.ReactNode;
}

const TermsSection = ({ title, children }: TermsSectionProps) => {
  return (
    <Card className="relative overflow-hidden backdrop-blur-lg bg-black/40 border border-purple-500/20 mb-8 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 pb-1">
          {title}
        </h2>
        <div className="text-gray-300 space-y-2">
          {children}
        </div>
      </div>
    </Card>
  );
};

export default TermsSection;