import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: 'Bespoke Couture',
    description:
      'Fully custom designs created exclusively for you, from initial concept to final fitting.',
    duration: '3-6 months',
  },
  {
    title: 'Made-to-Measure',
    description:
      'Existing designs tailored to your exact measurements for a perfect fit.',
    duration: '6-8 weeks',
  },
  {
    title: 'Bridal',
    description:
      'Dream wedding gowns crafted with the utmost care and attention to detail.',
    duration: '4-8 months',
  },
  {
    title: 'Private Styling',
    description:
      'Personal styling consultations for special events or wardrobe curation.',
    duration: 'By appointment',
  },
];

export function Atelier() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="atelier" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm tracking-editorial uppercase text-gold mb-4">
                Services
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl mb-6">
                The Atelier Experience
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed">
                Step into a world where your vision becomes reality. Our atelier
                offers a deeply personal experience, where every stitch is
                placed with intention and every detail is considered.
              </p>
            </div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group border-l-2 border-gold/30 hover:border-gold pl-6 py-2 transition-colors"
                >
                  <h3 className="font-serif text-xl mb-2">{service.title}</h3>
                  <p className="text-primary-foreground/60 text-sm mb-2">
                    {service.description}
                  </p>
                  <span className="text-xs tracking-editorial uppercase text-gold">
                    {service.duration}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="aspect-square bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-serif text-sm text-primary-foreground/30 italic text-center px-4">
                  Atelier Detail
                </span>
              </div>
              <div className="aspect-[3/4] bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-serif text-sm text-primary-foreground/30 italic text-center px-4">
                  Fabric Selection
                </span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[3/4] bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-serif text-sm text-primary-foreground/30 italic text-center px-4">
                  Hand Stitching
                </span>
              </div>
              <div className="aspect-square bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-serif text-sm text-primary-foreground/30 italic text-center px-4">
                  Final Fitting
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}