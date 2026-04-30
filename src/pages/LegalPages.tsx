import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

export function LegalPage({ title, lastUpdated, children }: { title: string, lastUpdated: string, children: ReactNode }) {
  const { t } = useTranslation('common');
  
  return (
    <div className="pt-32 pb-24 min-h-screen border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {title}
          </h1>
          <p className="text-slate-500 font-medium">{t('lastUpdated')}{lastUpdated}</p>
        </div>
        <div className="markdown-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  const { t } = useTranslation('legal-full');
  
  return (
    <LegalPage title={t('terms.title')} lastUpdated={t('lastUpdated')}>
      <p>{t('terms.introduction')}</p>
      
      <h2>{t('terms.acceptance')}</h2>
      <p>{t('terms.acceptanceText')}</p>
      
      <h2>{t('terms.useOfServices')}</h2>
      <p>{t('terms.useOfServicesText')}</p>
      <ul>
        <li>{t('terms.responsibility.credentials')}</li>
        <li>{t('terms.responsibility.misuse')}</li>
      </ul>
      
      <h2>{t('terms.intellectualProperty')}</h2>
      <p>{t('terms.intellectualPropertyText')}</p>
      
      <h2>{t('terms.dataPrivacy')}</h2>
      <p>{t('terms.dataPrivacyText')}</p>
      
      <h2>{t('terms.limitationLiability')}</h2>
      <p>{t('terms.limitationLiabilityText')}</p>
      
      <h2>{t('terms.changes')}</h2>
      <p>{t('terms.changesText')}</p>
    </LegalPage>
  );
}

export function PrivacyPage() {
  const { t } = useTranslation('legal-full');
  
  return (
    <LegalPage title={t('privacy.title')} lastUpdated={t('lastUpdated')}>
      <p>{t('privacy.introduction')}</p>
      
      <h2>{t('privacy.informationCollection')}</h2>
      <p>{t('privacy.informationCollectionText')}</p>
      
      <h2>{t('privacy.dataUsage')}</h2>
      <p>{t('privacy.dataUsageText')}</p>
      
      <h2>{t('privacy.dataSecurity')}</h2>
      <p>{t('privacy.dataSecurityText')}</p>
      
      <h2>{t('privacy.userRights')}</h2>
      <p>{t('privacy.userRightsText')}</p>
      
      <h2>{t('privacy.changes')}</h2>
      <p>{t('privacy.changesText')}</p>
    </LegalPage>
  );
}

export function CookiePage() {
  const { t } = useTranslation('legal-full');
  
  return (
    <LegalPage title={t('cookies.title')} lastUpdated={t('lastUpdated')}>
      <p>{t('cookies.introduction')}</p>
      
      <h2>{t('cookies.whatAreCookies')}</h2>
      <p>{t('cookies.whatAreCookiesText')}</p>
      
      <h2>{t('cookies.howWeUse')}</h2>
      <p>{t('cookies.howWeUseText')}</p>
      
      <h2>{t('cookies.categories')}</h2>
      <ul>
        <li><strong>{t('cookies.categories.essential')}:</strong> {t('cookies.categories.essentialText')}</li>
        <li><strong>{t('cookies.categories.analytics')}:</strong> {t('cookies.categories.analyticsText')}</li>
        <li><strong>{t('cookies.categories.marketing')}:</strong> {t('cookies.categories.marketingText')}</li>
      </ul>
      
      <h2>{t('cookies.managing')}</h2>
      <p>{t('cookies.managingText')}</p>
      
      <h2>{t('cookies.thirdParty')}</h2>
      <p>{t('cookies.thirdPartyText')}</p>
      
      <h2>{t('cookies.updates')}</h2>
      <p>{t('cookies.updatesText')}</p>
    </LegalPage>
  );
}
