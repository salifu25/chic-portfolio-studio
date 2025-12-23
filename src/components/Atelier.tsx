import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: 'Bespoke Couture',
    description: 'Fully custom designs created exclusively for you, from initial concept to final fitting.',
    duration: '3-6 months',
    price: 'From GH₵ 45,000',
  },
  {
    title: 'Made-to-Measure',
    description: 'Existing designs tailored to your exact measurements for a perfect fit.',
    duration: '6-8 weeks',
    price: 'From GH₵ 15,000',
  },
  {
    title: 'Bridal',
    description: 'Dream wedding gowns crafted with the utmost care and attention to detail.',
    duration: '4-8 months',
    price: 'From GH₵ 55,000',
  },
  {
    title: 'Private Styling',
    description: 'Personal styling consultations for special events or wardrobe curation.',
    duration: 'By appointment',
    price: 'GH₵ 2,500 / session',
  },
];

export function Atelier() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="atelier" className="section-padding-xl relative overflow-hidden bg-card">
      {/* Section marker */}
      <div className="absolute left-6 lg:left-12 top-24 hidden lg:block">
        <span className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground text-vertical">
          — 03 / Services
        </span>
      </div>

      {/* Large background text */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <span className="font-display text-[20rem] font-bold text-foreground/[0.02] leading-none">
          AB
        </span>
      </div>

      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="font-mono text-xs tracking-dramatic uppercase text-primary mb-6">
            ▸ The Experience
          </p>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight">
              THE
              <br />
              <span className="text-stroke">ATELIER</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-md">
              Step into a world where your vision becomes reality. Every stitch 
              is placed with intention, every detail considered.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="bg-card p-8 lg:p-12 group hover:bg-muted/30 transition-colors duration-500 relative"
            >
              {/* Number */}
              <span className="absolute top-8 right-8 font-mono text-xs text-muted-foreground">
                0{index + 1}
              </span>
              
              <div className="space-y-6">
                <h3 className="font-display text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="font-mono text-[10px] tracking-dramatic uppercase text-muted-foreground mb-1">
                      Timeline
                    </p>
                    <p className="font-mono text-sm">{service.duration}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-dramatic uppercase text-muted-foreground mb-1">
                      Investment
                    </p>
                    <p className="font-mono text-sm text-primary">{service.price}</p>
                  </div>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#book"
            className="inline-flex items-center gap-4 group"
          >
            <span className="font-mono text-sm uppercase tracking-dramatic text-muted-foreground group-hover:text-foreground transition-colors">
              Begin Your Journey
            </span>
            <span className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
