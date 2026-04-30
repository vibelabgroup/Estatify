import React from 'react';
import { useTranslation } from 'react-i18next';

interface PropertyStatsProps {
  beds: number;
  baths: number;
  sqm: number;
  variant?: 'default' | 'compact' | 'minimal' | 'inline';
  className?: string;
}

export const PropertyStats: React.FC<PropertyStatsProps> = ({ 
  beds, 
  baths, 
  sqm, 
  variant = 'default',
  className = '' 
}) => {
  const { t } = useTranslation('references');
  const baseClasses = "flex items-center gap-2";
  
  const statClasses = {
    default: "flex-1 bg-slate-50 py-2 rounded-lg flex flex-col items-center justify-center shrink-0",
    compact: "text-[9px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded",
    minimal: "flex flex-col items-center",
    inline: "text-center"
  };

  const labelClasses = {
    default: "text-[8px] text-slate-400 font-bold tracking-widest uppercase",
    compact: "",
    minimal: "text-[7px] uppercase tracking-widest text-slate-400",
    inline: "text-[7px] uppercase tracking-wider text-slate-500"
  };

  const valueClasses = {
    default: "text-sm font-bold text-slate-800",
    compact: "",
    minimal: "text-[11px] font-bold",
    inline: "text-xs font-black text-slate-800"
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className={statClasses[variant]}>
        <div className={valueClasses[variant]}>{beds}</div>
        <div className={labelClasses[variant]}>{t('beds')}</div>
      </div>
      {variant === 'inline' && <div className="w-px h-6 bg-slate-200" />}
      <div className={statClasses[variant]}>
        <div className={valueClasses[variant]}>{baths}</div>
        <div className={labelClasses[variant]}>{t('baths')}</div>
      </div>
      {variant === 'inline' && <div className="w-px h-6 bg-slate-200" />}
      <div className={statClasses[variant]}>
        <div className={valueClasses[variant]}>{sqm}</div>
        <div className={labelClasses[variant]}>
          {variant === 'inline' ? t('areaInline') : t('area')}
        </div>
      </div>
    </div>
  );
};
