import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserMockup } from '../BrowserMockup';
import { PropertyStats } from '../PropertyStats';
import { AgentInfo } from '../AgentInfo';
import { Reference } from '../../../data/references';

interface Layout2Props {
  reference: Reference;
}

export const Layout2: React.FC<Layout2Props> = ({ reference }) => {
  const { t } = useTranslation('references');
  return (
    <BrowserMockup>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 relative bg-slate-900 border-r border-slate-200">
          <img 
            src={reference.imageUrl} 
            alt={`${reference.title} - ${reference.location}`} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-900 font-bold text-[10px] px-2 py-1 rounded shadow-sm">
            {reference.price}
          </div>
        </div>
        
        <div className="w-1/2 bg-white flex flex-col p-4 overflow-hidden relative">
          <h3 className="text-[13px] font-bold text-slate-900 mb-1 leading-tight">
            {reference.title}
          </h3>
          <p className="text-slate-500 text-[10px] mb-3">{reference.location}</p>
          
          <PropertyStats 
            beds={reference.beds} 
            baths={reference.baths} 
            sqm={reference.sqm} 
            variant="compact"
            className="mb-3"
          />

          <p className="text-[9px] text-slate-500 line-clamp-3 mb-4 leading-relaxed">
            {reference.description}
          </p>

          <div className="mt-auto border border-slate-100 shadow-sm rounded-xl p-3 bg-slate-50/50">
            <AgentInfo 
              agent={reference.agent} 
              agentSeed={reference.agentSeed}
              variant="compact"
              className="mb-2"
            />
            <div className="flex gap-2">
              <div className="h-6 flex-1 bg-white border border-slate-200 rounded text-[9px] text-slate-400 px-2 flex items-center">
                Email
              </div>
              <button 
                className="h-6 px-3 bg-emerald-600 text-white rounded text-[9px] font-bold shadow-sm whitespace-nowrap hover:bg-emerald-700 transition-colors"
                aria-label={t('sendMessage')}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
};
