import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { AgentInfo } from '../AgentInfo';
import { Reference } from '../../../data/references';

interface Layout8Props {
  reference: Reference;
}

export const Layout8: React.FC<Layout8Props> = ({ reference }) => {
  const { t } = useTranslation('common');
  
  return (
    <BrowserMockup>
      <div className="flex-1 bg-white flex flex-col">
        <div className="grid grid-cols-3 gap-1 p-1 h-44">
          <div className="col-span-2 relative overflow-hidden rounded-tl-xl shadow-sm">
            <img 
              src={reference.imageUrl} 
              alt={`${reference.title} - ${reference.location}`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex-1 relative overflow-hidden rounded-tr-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-2 text-center text-[10px] font-bold text-white shadow-sm">
              {reference.price}
            </div>
            <div className="flex-1 relative overflow-hidden rounded-br-none shadow-sm">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reference.agentSeed}&backgroundColor=e2e8f0`} 
                alt={`${reference.agent}, real estate agent`} 
                className="w-full h-full object-cover scale-150 object-top"
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-[14px] font-bold text-slate-900 mb-0.5">{reference.title}</h3>
          <p className="text-slate-500 text-[9px] mb-3 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {reference.location}
          </p>
          
          <PropertyStats 
            beds={reference.beds} 
            baths={reference.baths} 
            sqm={reference.sqm} 
            variant="inline"
            className="justify-between py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 mb-3 shadow-inner"
          />
          
          <p className="text-[9px] text-slate-600 line-clamp-2 flex-1">
            {reference.description}
          </p>
          <button 
            className="w-full mt-2 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-md"
            aria-label={t('requestInfo')}
          >
            {t('requestInfo')}
          </button>
        </div>
      </div>
    </BrowserMockup>
  );
};
