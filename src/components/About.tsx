import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { designerInfo } from '@/data/mockData';
import designerPortrait from '@/assets/designer-portrait.jpg';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding-xl relative overflow-hidden">
      {/* Section marker */}
      <div className="absolute left-6 lg:left-12 top-24 hidden lg:block">
        <span className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground text-vertical">
          — 02 / The Designer
        </span>
      </div>

      {/* Background geometric element */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 border border-border/30 -rotate-12 hidden lg:block" />

      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image - Asymmetric placement */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:col-start-1 relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={designerPortrait}
                alt="Alex Black - Fashion Designer"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </div>
            {/* Decorative frame offset */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary -z-10 hidden md:block" />
            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-background p-6 border border-border hidden md:block"
            >
              <p className="font-display text-4xl font-bold text-primary">7+</p>
              <p className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground">Years Creating</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 lg:col-start-7 space-y-8"
          >
            <div>
              <p className="font-mono text-xs tracking-dramatic uppercase text-primary mb-6">
                ▸ The Visionary
              </p>
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-2">
                ALEX
              </h2>
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight text-stroke mb-8">
                BLACK
              </h2>
            </div>

            <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
              {designerInfo.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Achievements with unique styling */}
            <div className="pt-8 border-t border-border">
              <p className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground mb-6">
                Recognition
              </p>
              <ul className="space-y-4">
                {designerInfo.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-500" />
                    <span className="font-body text-base">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
