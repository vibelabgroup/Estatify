import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

export function CTA() {
  const { openModal } = useModal();
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-200"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
          
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 relative z-10">
            Ready to Sell More Properties?
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-10 relative z-10">
            Estatify turns your website into a 24/7 sales machine. While you're showing properties, sleeping, or spending time with family, we handle the rest.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <button
              onClick={openModal}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              Book Your Free Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-500 relative z-10">Questions? Contact us at support@estatify.ai</p>
        </motion.div>
      </div>
    </section>
  );
}
