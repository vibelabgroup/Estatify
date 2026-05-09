import { motion } from 'motion/react';
import { 
  BarChart3, Eye, Zap, Target, TrendingUp, Users, 
  MapPin, CheckCircle2, XCircle, Clock, Phone, TrendingDown,
  LineChart, BrainCircuit, MinusCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../contexts/ModalContext';

const getAnalyticsData = (t: any) => ({
  captureData: [
    {
      icon: Users,
      title: t('analytics.capture.visitorSessions'),
      description: t('analytics.capture.visitorSessionsDesc')
    },
    {
      icon: Eye,
      title: t('analytics.capture.propertyBehavior'),
      description: t('analytics.capture.propertyBehaviorDesc')
    },
    {
      icon: Zap,
      title: t('analytics.capture.highIntent'),
      description: t('analytics.capture.highIntentDesc')
    },
    {
      icon: Target,
      title: t('analytics.capture.engagementScoring'),
      description: t('analytics.capture.engagementScoringDesc')
    },
    {
      icon: TrendingUp,
      title: t('analytics.capture.marketIntelligence'),
      description: t('analytics.capture.marketIntelligenceDesc')
    },
    {
      icon: MapPin,
      title: t('analytics.capture.journeyMapping'),
      description: t('analytics.capture.journeyMappingDesc')
    }
  ],
  scenarios: [
    {
      title: t('analytics.scenarios.ghostBuyer.title'),
      situation: t('analytics.scenarios.ghostBuyer.situation'),
      without: t('analytics.scenarios.ghostBuyer.without'),
      with: t('analytics.scenarios.ghostBuyer.with'),
      result: t('analytics.scenarios.ghostBuyer.result')
    },
    {
      title: t('analytics.scenarios.comparisonShopper.title'),
      situation: t('analytics.scenarios.comparisonShopper.situation'),
      without: t('analytics.scenarios.comparisonShopper.without'),
      with: t('analytics.scenarios.comparisonShopper.with'),
      result: t('analytics.scenarios.comparisonShopper.result')
    },
    {
      title: t('analytics.scenarios.sleepyListing.title'),
      situation: t('analytics.scenarios.sleepyListing.situation'),
      without: t('analytics.scenarios.sleepyListing.without'),
      with: t('analytics.scenarios.sleepyListing.with'),
      result: t('analytics.scenarios.sleepyListing.result')
    }
  ],
  comparisons: [
    { bad: t('analytics.comparisons.guessBuy'), avg: t('analytics.comparisons.basicTracking'), good: t('analytics.comparisons.knowReady') },
    { bad: t('analytics.comparisons.callSame'), avg: t('analytics.comparisons.emailOpens'), good: t('analytics.comparisons.prioritize') },
    { bad: t('analytics.comparisons.followRandom'), avg: t('analytics.comparisons.dripCampaigns'), good: t('analytics.comparisons.perfectTiming') },
    { bad: t('analytics.comparisons.askWant'), avg: t('analytics.comparisons.knowCategories'), good: t('analytics.comparisons.alreadyKnow') },
    { bad: t('analytics.comparisons.hopePricing'), avg: t('analytics.comparisons.pastData'), good: t('analytics.comparisons.marketData') },
    { bad: t('analytics.comparisons.wasteMarketing'), avg: t('analytics.comparisons.trafficReports'), good: t('analytics.comparisons.investWorks') },
    { bad: t('analytics.comparisons.reactChanges'), avg: t('analytics.comparisons.spreadsheets'), good: t('analytics.comparisons.predictTrends') },
    { bad: t('analytics.comparisons.missOpportunities'), avg: t('analytics.comparisons.savedSearches'), good: t('analytics.comparisons.instantAlerts') }
  ]
});

export function AnalyticsSection() {
  const { t } = useTranslation('home');
  const { openModal } = useModal();
  const { captureData, scenarios, comparisons } = getAnalyticsData(t);

  return (
    <section className="py-24 bg-slate-50 text-slate-900 overflow-hidden relative border-t border-slate-200/60">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-200">
            <LineChart className="w-4 h-4" />
            {t('analytics.badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {t('analytics.title')} <span className="text-blue-600">{t('analytics.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-light">
            {t('analytics.subtitle')}
          </p>
        </div>

        {/* What We Capture Grid */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-12">
            <BrainCircuit className="w-8 h-8 text-blue-600 border border-blue-200 bg-blue-50 rounded-lg p-1.5" />
            <h3 className="text-2xl font-bold text-slate-900">{t('analytics.captureTitle')}</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {captureData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real World Scenarios */}
        <div className="mb-24">
           <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('analytics.scenariosTitle')}</h3>
            <p className="text-slate-500 font-light text-lg">{t('analytics.scenariosSubtitle')}</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {scenarios.map((scenario, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="bg-slate-50 p-8 border-b border-slate-100">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{scenario.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-slate-300 pl-4 font-light">
                    "{scenario.situation}"
                  </p>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6 flex-1">
                    <div className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-3 flex items-center gap-1.5 bg-rose-50 w-max px-2 py-1 rounded-md">
                      <XCircle className="w-3.5 h-3.5" /> {t('analytics.labels.without')}
                    </div>
                    <p className="text-sm text-slate-600 font-light">{scenario.without}</p>
                  </div>
                  <div className="mb-8 flex-1">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-1.5 bg-blue-50 w-max px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t('analytics.labels.with')}
                    </div>
                    <p className="text-sm text-slate-600 font-light">{scenario.with}</p>
                  </div>
                  <div className="pt-5 border-t border-slate-100 mt-auto">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">{t('analytics.labels.result')}</div>
                    <p className="text-sm text-slate-900 font-semibold">{scenario.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200/60 p-6 sm:p-8">
              <div className="text-lg font-bold text-slate-500">{t('analytics.headers.without')}</div>
              <div className="text-lg font-bold text-slate-600 pl-5 sm:pl-6 border-l border-slate-200/60">{t('analytics.headers.other')}</div>
              <div className="text-lg font-bold text-blue-600 flex items-center gap-2 pl-5 sm:pl-6 border-l border-slate-200/60">
                <Target className="w-5 h-5" /> {t('analytics.headers.estatify')}
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {comparisons.map((comp, idx) => (
                <div key={idx} className="grid grid-cols-3 p-5 sm:p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 pr-4">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span className="text-slate-500 text-sm sm:text-base font-light">{comp.bad}</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 sm:px-6 border-l border-slate-100">
                    <MinusCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-slate-600 text-sm sm:text-base font-light">{comp.avg}</span>
                  </div>
                  <div className="flex items-center gap-3 pl-5 sm:pl-6 border-l border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-900 font-medium text-sm sm:text-base">{comp.good}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
