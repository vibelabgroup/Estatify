import React from 'react';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { Reference } from '../../../data/references';

interface Layout6Props {
  reference: Reference;
}

export const Layout6: React.FC<Layout6Props> = ({ reference }) => {
  return (
    <BrowserMockup>
      <div className="flex-1 relative overflow-hidden">
        <img 
          src={reference.imageUrl} 
          alt={`${reference.title} - ${reference.location}`} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-bold shadow-sm">{reference.title}</h3>
              <p className="text-[10px] text-white/80">{reference.location}</p>
            </div>
            <span className="font-bold text-[11px] bg-white/30 px-2 py-0.5 rounded backdrop-blur-sm">
              {reference.price}
            </span>
          </div>
          
          <p className="text-[9px] text-white/90 line-clamp-2 mb-3 leading-relaxed">
            {reference.description}
          </p>
          
          <div className="flex items-center justify-between">
            <PropertyStats 
              beds={reference.beds} 
              baths={reference.baths} 
              sqm={reference.sqm} 
              variant="compact"
              className="gap-2"
            />
            <button 
              className="bg-white text-slate-900 px-3 py-1 text-[9px] font-bold rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Book a tour for this property"
            >
              Book Tour
            </button>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
};
