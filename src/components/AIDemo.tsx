import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AIDemo() {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Content Engine</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            From raw data to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">irresistible copy.</span>
          </h2>
          <p className="text-lg tracking-tight text-slate-400 font-light">
            Automatically create engaging, SEO-friendly descriptions for your listings, saving you hours of time and boosting online visibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700/50 relative"
          >
            <div className="absolute top-4 right-6 text-xs font-bold uppercase tracking-widest text-slate-500">Without Estatify</div>
            <div className="mt-6 flex flex-col h-full">
              <div className="text-rose-400 font-mono text-sm mb-4">Original property description by seller</div>
              <div className="bg-slate-900/50 p-6 rounded-2xl flex-1 font-mono text-sm text-slate-400 leading-relaxed border border-slate-800 overflow-y-auto">
                <span className="text-rose-300">IN A BEAUTIFUL</span> "RESIDENTIAL ALAZAN" URBANIZATION <span className="text-rose-300">WITH SECURITY...</span> 4 SPACIOUS COVERED GARAGE SPACES OUT FOR SALE... <span className="text-rose-300">9,500 EUROS EACH...</span> PRICED TO SELL IMMEDIATELY MUST SEE... CAN BUY ONE OR ALL FOUR. EASY TO PARK. AUTO DOOR REMOTE CONTROL INCLUDED. VERY SAFE CAMERAS 24/7. GOOD FOR RENTAL INVESTMENT URGENT SALE AS OWNER RELOCATING DONT MISS OUT.
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-blue-600/10 border border-blue-500/20 relative shadow-2xl shadow-blue-900/20"
          >
            <div className="absolute top-4 right-6 text-xs font-bold uppercase tracking-widest text-blue-400">With Estatify AI</div>
            <div className="mt-6 flex flex-col h-full">
              <div className="text-blue-400 font-sans font-medium text-sm mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 
                Optimized Output
              </div>
              <div className="bg-white/5 p-6 rounded-2xl flex-1 text-slate-200 leading-relaxed border border-white/10 text-sm overflow-y-auto">
                <p className="mb-4">
                  An exceptional opportunity to acquire up to four spacious, covered garage spaces in the highly sought-after <span className="text-white font-semibold">Residential Alazan</span> urbanization.
                </p>
                <p className="mb-4 text-slate-300">
                  Whether you are a local resident seeking secure parking or an investor looking for high rental yield potential, these spaces offer supreme convenience and peace of mind.
                </p>
                <ul className="space-y-2 mb-4 text-slate-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> <span className="text-white font-medium">Premium Location:</span> Prestigious, gated community</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> <span className="text-white font-medium">Maximum Security:</span> 24/7 monitored cameras & access control</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> <span className="text-white font-medium">Flexible Purchase:</span> Available individually at €9,500 each</li>
                </ul>
                <p className="text-slate-300 italic">
                  Priced for an immediate sale. Contact us today to secure yours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
