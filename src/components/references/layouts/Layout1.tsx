import React from 'react';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { AgentInfo } from '../AgentInfo';
import { Reference } from '../../../data/references';

interface Layout1Props {
  reference: Reference;
}

export const Layout1: React.FC<Layout1Props> = ({ reference }) => {
  return (
    <BrowserMockup>
      {/* Hero Section with Floating Form */}
      <div className="relative h-[220px] shrink-0 shadow-inner">
        <img 
          src={reference.imageUrl} 
          alt={`${reference.title} - ${reference.location}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        
        <div className="absolute bottom-5 left-5 right-5 z-10 pr-[220px]">
          <h3 className="text-xl font-bold text-white shadow-sm mb-1 truncate">
            {reference.title}
          </h3>
          <div className="flex items-center gap-3">
            <p className="text-blue-200 text-xs font-medium">{reference.location}</p>
            <span className="text-white font-bold bg-blue-600/90 px-2 py-0.5 rounded text-xs">
              {reference.price}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white flex p-4 relative">
        <div className="flex-1 pr-4 flex flex-col">
          <PropertyStats 
            beds={reference.beds} 
            baths={reference.baths} 
            sqm={reference.sqm} 
            variant="default"
            className="mb-4"
          />
          <p className="text-[10px] text-slate-600 leading-relaxed line-clamp-4 pr-1">
            {reference.description}
          </p>
        </div>

        <div className="w-[180px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col p-3 border border-slate-100 absolute right-4 -top-16 z-20">
          <p className="text-[9px] text-slate-500 font-medium leading-snug mb-2">
            Speak directly with a local expert. No call centers.
          </p>
          
          <AgentInfo 
            agent={reference.agent} 
            agentSeed={reference.agentSeed}
            variant="default"
            className="mb-3"
          />

          <div className="space-y-1.5 mb-3">
            <div className="h-6 w-full bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-400 px-2 flex items-center">
              Your Name
            </div>
            <div className="h-6 w-full bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-400 px-2 flex items-center">
              Email
            </div>
            <div className="h-6 w-full bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-400 px-2 flex items-center">
              Phone
            </div>
          </div>
          
          <button 
            className="w-full py-1.5 bg-blue-600 text-white rounded text-[10px] font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
            aria-label="Get property details"
          >
            Get Details
          </button>
        </div>
      </div>
    </BrowserMockup>
  );
};
