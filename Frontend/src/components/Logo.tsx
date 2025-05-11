import React from 'react';
import Logo1 from '@/Logo1.jpg';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-9 w-9 rounded-full overflow-hidden mr-2">
        <img src={Logo1} alt="TritoNexus Logo" className="w-full h-full object-cover" />
      </div>
      <span className="font-bold text-xl">
        Trito<span className="text-tritonexus-purple">Nexus</span>
      </span>
    </div>
  );
};

export default Logo;
