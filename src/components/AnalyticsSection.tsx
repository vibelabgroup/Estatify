import { motion } from 'motion/react';
import { 
  BarChart3, Eye, Zap, Target, TrendingUp, Users, 
  MapPin, CheckCircle2, XCircle, Clock, Phone, TrendingDown,
  LineChart, BrainCircuit, MinusCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const captureData = [
  {
    icon: Users,
    title: "Complete Visitor Sessions",
    description: "Track source, device, time, and complete browsing paths to know exactly where buyers originate."
  },
  {
    icon: Eye,
    title: "Property Viewing Behavior",
    description: "See exactly which properties are viewed, time spent on galleries, and return visits."
  },
  {
    icon: Zap,
    title: "High-Intent Actions",
    description: "Instantly capture contact clicks, favorites, shares, and viewing requests."
  },
  {
    icon: Target,
    title: "Engagement Scoring (0-100)",
    description: "Automatically score every lead so you know exactly who is hot and who is just browsing."
  },
  {
    icon: TrendingUp,
    title: "Live Market Intelligence",
    description: "Monitor avg. price/m², supply vs demand in specific zones, and track competitor price drops."
  },
  {
    icon: MapPin,
    title: "User Journey Mapping",
    description: "Discover which ad campaigns bring serious buyers vs window shoppers to optimize your budget."
  }
];

const scenarios = [
  {
    title: "The 'Ghost' Buyer",
    situation: "Someone asks about 'apartments in Marbella' with just an email.",
    without: "Send a generic email. No response.",
    with: "You see they spent time on 2-bedroom units in Puerto Banús (€300k-€400k range) and viewed financing options. You reply with three highly specific, matching properties.",
    result: "They respond in 2 hours. You book viewings and close in 10 days."
  },
  {
    title: "The Comparison Shopper",
    situation: "A lead contacts you, but you know they're talking to 5 other agents.",
    without: "You drop your commission to try and secure the deal.",
    with: "Analytics show they are price-sensitive and frequently check price drops. You focus entirely on the lowest price per m² and ROI.",
    result: "You win the deal by being a trusted advisor, not the cheapest agent."
  },
  {
    title: "The Sleepy Listing",
    situation: "A property sits for 60 days. The seller is frustrated.",
    without: "You blame the slow market and risk losing the listing.",
    with: "Data shows 1,200 views but 80% left after seeing the price. Similar homes sold 8% lower.",
    result: "You present cold, hard data. Seller agrees to a small price drop. Property sells within 2 weeks."
  }
];

const comparisons = [
  { bad: "Guess who might buy", avg: "Basic page view tracking", good: "Know exactly who's ready" },
  { bad: "Call everyone the same", avg: "Score by email opens", good: "Prioritize hot leads first" },
  { bad: "Follow up randomly", avg: "Generic drip campaigns", good: "Time your follow-up perfectly" },
  { bad: "Ask 'what do you want?'", avg: "Know favored categories", good: "Already know what they want" },
  { bad: "Hope your pricing is right", avg: "View past sold data", good: "Price based on real market data" },
  { bad: "Waste money on bad marketing", avg: "Basic traffic reports", good: "Invest heavily in what works" },
  { bad: "React to market changes", avg: "Provide raw spreadsheets", good: "Predict trends before they happen" },
  { bad: "Miss price drop opportunities", avg: "Manual saved searches", good: "Get instant alerts on deals" },
];

export function AnalyticsSection() {
  const { t } = useTranslation('home');

  return (
    <section className="py-24 bg-slate-50 text-slate-900 overflow-hidden relative border-t border-slate-200/60">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-200">
            <LineChart className="w-4 h-4" />
            Your Unfair Advantage
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Stop Guessing. <span className="text-blue-600">Start Knowing.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-light">
            Estatify Analytics is like having a sales coach who watches every visitor to your website, tells you who's ready to buy, and shows you exactly what to do next to close the deal.
          </p>
        </div>

        {/* What We Capture Grid */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-12">
            <BrainCircuit className="w-8 h-8 text-blue-600 border border-blue-200 bg-blue-50 rounded-lg p-1.5" />
            <h3 className="text-2xl font-bold text-slate-900">What We Capture 24/7</h3>
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
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Real-World Scenarios</h3>
            <p className="text-slate-500 font-light text-lg">How deep behavioral data turns cold leads into closed deals.</p>
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
                      <XCircle className="w-3.5 h-3.5" /> Without Estatify
                    </div>
                    <p className="text-sm text-slate-600 font-light">{scenario.without}</p>
                  </div>
                  <div className="mb-8 flex-1">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-1.5 bg-blue-50 w-max px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> With Analytics
                    </div>
                    <p className="text-sm text-slate-600 font-light">{scenario.with}</p>
                  </div>
                  <div className="pt-5 border-t border-slate-100 mt-auto">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">The Result</div>
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
              <div className="text-lg font-bold text-slate-500">Without Analytics</div>
              <div className="text-lg font-bold text-slate-600 pl-5 sm:pl-6 border-l border-slate-200/60">Other Softwares</div>
              <div className="text-lg font-bold text-blue-600 flex items-center gap-2 pl-5 sm:pl-6 border-l border-slate-200/60">
                <Target className="w-5 h-5" /> With Estatify
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 shadow-2xl border border-slate-700">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('analyticsCta.title')}
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('analyticsCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                {t('analyticsCta.primaryButton')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-200"
              >
                {t('analyticsCta.secondaryButton')}
              </motion.button>
            </div>
            <p className="text-slate-400 text-sm mt-6">
              {t('analyticsCta.disclaimer')}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
