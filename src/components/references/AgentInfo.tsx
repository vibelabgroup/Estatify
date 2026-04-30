import React from 'react';

interface AgentInfoProps {
  agent: string;
  agentSeed: string;
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
}

export const AgentInfo: React.FC<AgentInfoProps> = ({ 
  agent, 
  agentSeed, 
  variant = 'default',
  className = '' 
}) => {
  const containerClasses = {
    default: "flex items-center gap-2",
    compact: "flex items-center gap-2",
    minimal: "flex items-center gap-2"
  };

  const imageClasses = {
    default: "w-8 h-8 rounded-full overflow-hidden shrink-0 bg-slate-100 border-2 border-white shadow-sm",
    compact: "w-6 h-6 rounded-full border border-white shadow-sm",
    minimal: "w-6 h-6 rounded-full border border-slate-200"
  };

  const textContainerClasses = {
    default: "flex flex-col truncate",
    compact: "flex flex-col truncate",
    minimal: ""
  };

  const nameClasses = {
    default: "text-[10px] font-bold text-slate-800 leading-none mb-0.5 truncate",
    compact: "text-[10px] font-bold text-slate-700",
    minimal: "text-[9px] font-bold text-slate-800"
  };

  const titleClasses = {
    default: "text-[8px] text-blue-600 font-bold uppercase tracking-wider leading-none",
    compact: "",
    minimal: "text-[7px] text-slate-500"
  };

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      <div className={imageClasses[variant]}>
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agentSeed}&backgroundColor=e2e8f0`} 
          alt={`${agent}, real estate agent`} 
          className="w-full h-full"
        />
      </div>
      <div className={textContainerClasses[variant]}>
        <span className={nameClasses[variant]}>{agent}</span>
        {variant === 'default' && (
          <span className={titleClasses[variant]}>Local Agent</span>
        )}
        {variant === 'minimal' && (
          <span className={titleClasses[variant]}>Listing Agent</span>
        )}
      </div>
    </div>
  );
};
