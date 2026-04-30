import { motion } from 'motion/react';
import { Clock, CheckCircle2 } from 'lucide-react';

const before = [
  "Search through 5 systems to check properties",
  "Try to remember which leads to call back",
  "Write property descriptions manually",
  "Wonder if your marketing is working",
  "Miss inquiries because you're away"
];

const after = [
  "Check one dashboard, see everything instantly",
  "System tells you who to call & why",
  "Generate AI descriptions in seconds",
  "Clear reports show what's actually working",
  "Chatbot captures leads while you sleep"
];

export function BeforeAfter() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            How Your Day Changes
          </h2>
          <p className="text-lg tracking-tight text-slate-500 font-light">
            Go from scattered and stressed to organized and efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-500" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">Before Estatify</h3>
            </div>
            <ul className="space-y-6">
              {before.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-500 mt-0.5">X</span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-3xl bg-blue-50 border border-blue-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/50 rounded-full blur-3xl" />
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">With Estatify</h3>
              </div>
              <ul className="space-y-6">
                {after.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-blue-600 mt-0.5" />
                    <span className="text-slate-900 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
