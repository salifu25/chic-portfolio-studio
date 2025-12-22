import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { designerInfo } from '@/data/mockData';
import designerPortrait from '@/assets/designer-portrait.jpg';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] bg-muted overflow-hidden"
          >
            <img
              src={designerPortrait}
              alt="Elara Vance - Fashion Designer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
            {/* Decorative frame */}
            <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
                The Designer
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl mb-6">
                A Vision of Elegance
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {designerInfo.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Recognition
              </p>
              <ul className="space-y-2">
                {designerInfo.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {achievement}
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