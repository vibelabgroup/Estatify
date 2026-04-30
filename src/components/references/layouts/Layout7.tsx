import React from 'react';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { AgentInfo } from '../AgentInfo';
import { Reference } from '../../../data/references';

interface Layout7Props {
  reference: Reference;
}

export const Layout7: React.FC<Layout7Props> = ({ reference }) => {
  return (
    <BrowserMockup>
      <div className="flex-1 flex flex-col bg-slate-50 p-4">
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-[8px] uppercase tracking-widest text-emerald-600 font-bold mb-1 block">
              Featured Listing
            </span>
            <h3 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              {reference.title}
            </h3>
          </div>
          <div className="text-sm font-black text-slate-900">{reference.price}</div>
        </div>
        
        <div className="rounded-xl overflow-hidden h-40 mb-3 relative group">
          <img 
            src={reference.imageUrl} 
            alt={`${reference.title} - ${reference.location}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[8px] font-bold flex gap-2 shadow-sm">
            <span>{reference.beds} Bed</span>
            <span>{reference.baths} Bath</span>
            <span>{reference.sqm} m²</span>
          </div>
        </div>

        <p className="text-[9px] text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {reference.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
          <AgentInfo 
            agent={reference.agent} 
            agentSeed={reference.agentSeed}
            variant="minimal"
          />
          <button 
            className="bg-emerald-500 text-white px-4 py-1.5 rounded-md text-[9px] font-bold hover:bg-emerald-600 transition-colors"
            aria-label={`Contact ${reference.agent} about this property`}
          >
            Contact
          </button>
        </div>
      </div>
    </BrowserMockup>
  );
};
