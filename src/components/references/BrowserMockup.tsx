import React from 'react';
import { useTranslation } from 'react-i18next';

interface BrowserMockupProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({ 
  children, 
  title,
  className = '' 
}) => {
  const { t } = useTranslation('references');
  
  return (
    <div className={`bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xl flex flex-col h-[500px] relative z-10 transition-transform duration-500 hover:-translate-y-2 ${className}`}>
      {/* Browser Top */}
      <div className="bg-slate-900 h-12 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0 z-20" role="toolbar" aria-label={t('browserControls')}>
        <div className="flex gap-1.5" role="group" aria-label={t('windowControls')}>
          <div className="w-3 h-3 rounded-full bg-rose-500" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-amber-500" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
        </div>
        <div className="mx-auto w-1/2 h-6 bg-slate-800 rounded-md flex items-center px-2 gap-2" aria-hidden="true">
          <div className="w-3 h-3 rounded bg-slate-600" />
          <div className="w-1/2 h-2 rounded bg-slate-700" />
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
