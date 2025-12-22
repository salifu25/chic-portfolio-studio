import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

    // TODO: Integrate with backend API
    // Placeholder for contact form logic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message Sent',
      description: 'Thank you for reaching out. We will respond shortly.',
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm tracking-editorial uppercase text-gold mb-4">
                Get in Touch
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl mb-6">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're interested in commissioning a piece, purchasing
                from a collection, or simply have a question, we'd love to hear
                from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-medium mb-1">Atelier</p>
                  <p className="text-muted-foreground text-sm">
                    {designerInfo.studioLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a
                    href={`mailto:${designerInfo.email}`}
                    className="text-muted-foreground text-sm hover:text-gold transition-colors"
                  >
                    {designerInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <a
                    href={`tel:${designerInfo.phone}`}
                    className="text-muted-foreground text-sm hover:text-gold transition-colors"
                  >
                    {designerInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm tracking-editorial uppercase text-muted-foreground mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-sm hover:text-gold transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-sm hover:text-gold transition-colors"
                  aria-label="Pinterest"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="contactName" className="text-sm tracking-wide">
                Name
              </label>
              <Input
                id="contactName"
                name="name"
                required
                className="bg-background border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm tracking-wide">
                Email
              </label>
              <Input
                id="contactEmail"
                name="email"
                type="email"
                required
                className="bg-background border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm tracking-wide">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full h-10 px-3 bg-background border border-border rounded-sm text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              >
                <option value="">Select a topic</option>
                <option value="purchase">Purchase Inquiry</option>
                <option value="commission">Commission Request</option>
                <option value="press">Press Inquiry</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="contactMessage" className="text-sm tracking-wide">
                Message
              </label>
              <Textarea
                id="contactMessage"
                name="message"
                rows={6}
                required
                placeholder="How can we assist you?"
                className="bg-background border-border focus:border-gold focus:ring-gold resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="editorial"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}