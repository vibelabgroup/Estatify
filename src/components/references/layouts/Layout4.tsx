import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { AgentInfo } from '../AgentInfo';
import { Reference } from '../../../data/references';

interface Layout4Props {
  reference: Reference;
}

export const Layout4: React.FC<Layout4Props> = ({ reference }) => {
  const { t } = useTranslation('common');
  
  return (
    <BrowserMockup>
      <div className="flex flex-1 overflow-hidden bg-slate-900 text-white">
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="text-amber-400 font-bold text-[9px] uppercase tracking-widest mb-1">
              New Listing
            </div>
            <h3 className="text-lg font-bold mb-1 leading-tight">{reference.title}</h3>
            <p className="text-slate-400 text-[10px] mb-3">{reference.location}</p>
            
            <PropertyStats 
              beds={reference.beds} 
              baths={reference.baths} 
              sqm={reference.sqm} 
              variant="minimal"
              className="mb-3 border-y border-slate-800 py-2 gap-2"
            />
            
            <p className="text-[9px] text-slate-300 line-clamp-3 leading-relaxed mb-4">
              {reference.description}
            </p>
            <div className="text-xl font-bold text-white">{reference.price}</div>
          </div>
          <button 
            className="w-full py-2 bg-amber-500 text-slate-900 font-bold text-[10px] rounded hover:bg-amber-400 transition-colors"
            aria-label={t('requestInfo')}
          >
            {t('requestInfo')}
          </button>
        </div>
        <div className="w-[45%] relative">
          <img 
            src={reference.imageUrl} 
            alt={`${reference.title} - ${reference.location}`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </BrowserMockup>
  );
};
