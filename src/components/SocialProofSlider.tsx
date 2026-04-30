import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    quote: "Since integrating Estatify.ai into our operations, we've seen a 30% increase in property sales. The AI-generated descriptions are engaging and have significantly boosted our online visibility.",
    author: "Vun Thy",
    roleKey: "realEstateAgent"
  },
  {
    quote: "The results speak for themselves: since using Estatify.ai, our sales have increased by 35%, and our properties are selling faster than ever. What really impressed me was how easily it integrated with our existing systems, including ReSales Online.",
    author: "Marta",
    roleKey: "propertyManager"
  },
  {
    quote: "I've been in real estate for over a decade, and Estatify.ai is the most impressive tool I've come across... Since we started using the platform, we've seen a 45% increase in inquiries and significantly faster sales cycles.",
    author: "Julia",
    roleKey: "propertySales"
  }
];

export function SocialProofSlider() {
  const { t } = useTranslation('home');
  
  // Duplicate array significantly for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-white border-t border-slate-100 overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 right-1/4 -mt-32 w-96 h-96 bg-blue-100 rounded-full blur-[100px] pointer-events-none opacity-20" />
      
      <div className="max-w-[100vw] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {t('socialProof.title')}
          </h2>
          <p className="text-lg tracking-tight text-slate-500 font-light">
            {t('socialProof.subtitle')}
          </p>
        </div>

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-12">
          {/* Gradients for smooth fade effect at edges */}
          <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-24 lg:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-24 lg:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 45, // Adjust speed
            }}
            className="flex w-max"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-[300px] sm:w-[400px] flex-shrink-0 mx-3 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex gap-1 mb-6 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-slate-600 font-light leading-relaxed mb-8 flex-1 text-sm sm:text-base">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-500 text-lg flex-shrink-0">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-500 font-medium">{t(`socialProof.roles.${testimonial.roleKey}`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
