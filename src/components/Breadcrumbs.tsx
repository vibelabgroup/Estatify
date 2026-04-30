import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const { t } = useTranslation('common');
  
  return (
    <nav aria-label={t('breadcrumb')} className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={item.url}>
          <Link to={item.url} className="text-slate-500 hover:text-slate-900">
            {item.name}
          </Link>
          {index < items.length - 1 && (
            <span className="text-slate-400 mx-2">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
