import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { AgentInfo } from '../AgentInfo';
import { Reference } from '../../../data/references';

interface Layout3Props {
  reference: Reference;
}

export const Layout3: React.FC<Layout3Props> = ({ reference }) => {
  const { t } = useTranslation('common');
  
  return (
    <BrowserMockup>
      <div className="relative h-[260px] shrink-0">
        <img 
          src={reference.imageUrl} 
          alt={`${reference.title} - ${reference.location}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-slate-900/90 to-transparent">
          <div className="mt-auto">
            <span className="inline-block bg-white text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mb-2 rounded border border-white/50">
              Exclusive
            </span>
            <h3 className="text-xl font-bold text-white mb-1">{reference.title}</h3>
            <p className="text-white/80 text-[10px] font-medium mb-3">{reference.location}</p>
            <div className="text-2xl font-bold text-white tracking-tight drop-shadow-md mb-2">
              {reference.price}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-slate-50 items-center justify-center p-5 pt-3">
        <PropertyStats 
          beds={reference.beds} 
          baths={reference.baths} 
          sqm={reference.sqm} 
          variant="minimal"
          className="text-slate-700 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 -mt-8 z-20 mb-3 w-4/5 max-w-[240px]"
        />
        
        <p className="text-[9px] text-slate-600 line-clamp-2 text-center max-w-[90%] mb-4 mx-auto leading-relaxed">
          {reference.description}
        </p>

        <div className="w-full max-w-[260px] bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm flex items-center gap-2">
          <input 
            type="email" 
            placeholder={t('enterEmailForDetails')} 
            className="flex-1 bg-transparent border-none focus:outline-none text-[10px] px-1"
            aria-label={t('emailForPropertyDetails')}
          />
          <button 
            className="bg-slate-900 text-white rounded text-[9px] font-bold px-3 py-1.5 hover:bg-slate-800 transition-colors"
            aria-label={t('submitEmailForDetails')}
          >
            {t('submit')}
          </button>
        </div>
      </div>
    </BrowserMockup>
  );
};
