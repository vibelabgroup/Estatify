import React from 'react';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { Reference } from '../../../data/references';

interface Layout5Props {
  reference: Reference;
}

export const Layout5: React.FC<Layout5Props> = ({ reference }) => {
  return (
    <BrowserMockup>
      <div className="flex-1 bg-[#F9F8F6] p-5 relative flex flex-col items-center text-center">
        <h3 className="text-xl font-serif text-slate-900 mb-1 leading-tight">
          {reference.title}
        </h3>
        <p className="text-slate-500 text-[9px] uppercase tracking-widest mb-4">
          {reference.location}
        </p>
        
        <div className="w-full h-40 shrink-0 relative overflow-hidden mb-4">
          <img 
            src={reference.imageUrl} 
            alt={`${reference.title} - ${reference.location}`} 
            className="w-full h-full object-cover rounded-t-full shadow-sm"
          />
        </div>

        <PropertyStats 
          beds={reference.beds} 
          baths={reference.baths} 
          sqm={reference.sqm} 
          variant="minimal"
          className="mb-4 text-slate-800 border-t border-b border-slate-200 w-full justify-center py-2 gap-4"
        />
        
        <p className="text-[10px] text-slate-600 font-serif italic line-clamp-2 px-2 mb-4">
          "{reference.description}"
        </p>
        <button 
          className="px-6 py-2 border border-slate-900 text-slate-900 text-[9px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors"
          aria-label={`Contact agent for ${reference.title} at ${reference.price}`}
        >
          Contact Agent - {reference.price}
        </button>
      </div>
    </BrowserMockup>
  );
};
