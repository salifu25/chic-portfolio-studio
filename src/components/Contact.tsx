import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { designerInfo } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: 'Message Sent',
      description: 'Thank you for reaching out. We will respond shortly.',
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="section-padding-xl relative">
      <div className="absolute left-6 lg:left-12 top-24 hidden lg:block">
        <span className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground text-vertical">
          — 04 / Contact
        </span>
      </div>

      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="font-mono text-xs tracking-dramatic uppercase text-primary mb-6">▸ Get in Touch</p>
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">CONTACT</h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Whether you're commissioning a piece or have a question, we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Atelier', value: designerInfo.studioLocation },
                { icon: Mail, label: 'Email', value: designerInfo.email, href: `mailto:${designerInfo.email}` },
                { icon: Phone, label: 'Phone', value: designerInfo.phone, href: `tel:${designerInfo.phone}` },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-body text-foreground hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-body text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 border border-border p-8 lg:p-12"
          >
            <div className="space-y-2">
              <label htmlFor="contactName" className="font-mono text-xs tracking-dramatic uppercase">Name</label>
              <Input id="contactName" name="name" required className="bg-transparent border-border focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contactEmail" className="font-mono text-xs tracking-dramatic uppercase">Email</label>
              <Input id="contactEmail" name="email" type="email" required className="bg-transparent border-border focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contactMessage" className="font-mono text-xs tracking-dramatic uppercase">Message</label>
              <Textarea id="contactMessage" name="message" rows={6} required className="bg-transparent border-border focus:border-primary resize-none" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 font-mono text-sm uppercase tracking-dramatic border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary transition-all duration-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
