import { motion } from 'framer-motion';
import { designerInfo } from '@/data/mockData';
import heroImage from '@/assets/hero-fashion.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
      {/* Background Image with dramatic overlay */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={heroImage}
          alt="Alex Black Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Floating geometric accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] border border-primary/20 rotate-45 hidden lg:block"
      />
      
      {/* Animated gold orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/20 to-transparent blur-[100px] animate-pulse-glow"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12 pt-32">
        <div className="max-w-4xl">
          {/* Mono label */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs tracking-dramatic uppercase text-primary mb-8"
          >
            ▸ Accra, Ghana — Est. 2018
          </motion.p>

          {/* Main headline with split reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight leading-[0.85]"
            >
              ALEX
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight leading-[0.85] text-stroke-gold"
            >
              BLACK
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-xl md:text-2xl text-muted-foreground mb-12 max-w-lg italic"
          >
            {designerInfo.tagline}
          </motion.p>

          {/* CTA buttons with unique styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#collections"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase tracking-dramatic border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary transition-all duration-500"
            >
              <span className="relative z-10">View Collections</span>
            </a>
            <a
              href="#book"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase tracking-dramatic border border-foreground/30 text-foreground hover:border-primary hover:text-primary transition-all duration-500"
            >
              <span className="relative z-10">Book Consultation</span>
              <motion.span
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="absolute left-0 bottom-0 h-px bg-primary"
              />
            </a>
          </motion.div>
        </div>

        {/* Vertical text accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <p className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground text-vertical">
            African Heritage × Global Elegance
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-dramatic uppercase text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
