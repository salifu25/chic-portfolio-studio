import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const appointmentTypes = [
  'Bespoke Consultation',
  'Made-to-Measure Fitting',
  'Bridal Consultation',
  'Private Styling Session',
  'Collection Viewing',
];

export function BookingForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Integrate with backend API
    // Placeholder for appointment booking logic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Request Received',
      description:
        'Thank you for your interest. We will contact you within 24 hours to confirm your appointment.',
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="book" className="py-24 lg:py-32 bg-secondary/30">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-editorial uppercase text-gold mb-4">
              Schedule
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-6">
              Book an Appointment
            </h2>
            <p className="text-muted-foreground">
              Begin your bespoke journey with a private consultation at our
              Paris atelier or via video call.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm tracking-wide">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className="bg-background border-border focus:border-gold focus:ring-gold"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm tracking-wide">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className="bg-background border-border focus:border-gold focus:ring-gold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm tracking-wide">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-background border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm tracking-wide">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="bg-background border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="appointmentType" className="text-sm tracking-wide">
                Type of Appointment
              </label>
              <select
                id="appointmentType"
                name="appointmentType"
                required
                className="w-full h-10 px-3 bg-background border border-border rounded-sm text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              >
                <option value="">Select an option</option>
                {appointmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="preferredDate" className="text-sm tracking-wide">
                Preferred Date
              </label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                className="bg-background border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm tracking-wide">
                Additional Details
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your vision or any special requirements..."
                className="bg-background border-border focus:border-gold focus:ring-gold resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="editorial"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Appointment'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We typically respond within 24-48 hours. For urgent inquiries,
              please call our atelier directly.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}