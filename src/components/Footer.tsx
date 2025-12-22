import { designerInfo } from '@/data/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">{designerInfo.name}</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Haute couture and bespoke fashion, handcrafted in Accra with
              African heritage and timeless elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm tracking-editorial uppercase mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="#collections"
                  className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#atelier"
                  className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  Appointments
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm tracking-editorial uppercase mb-4">Atelier</p>
            <p className="text-sm text-primary-foreground/60 mb-2">
              {designerInfo.studioLocation}
            </p>
            <a
              href={`mailto:${designerInfo.email}`}
              className="text-sm text-primary-foreground/60 hover:text-gold transition-colors block mb-4"
            >
              {designerInfo.email}
            </a>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {currentYear} {designerInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-primary-foreground/40 hover:text-gold transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-primary-foreground/40 hover:text-gold transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}