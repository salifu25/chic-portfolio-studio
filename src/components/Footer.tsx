import { designerInfo } from '@/data/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-display text-3xl font-bold mb-4">AB</h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              Haute couture handcrafted in Accra with African heritage and timeless elegance.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground mb-6">Navigation</p>
            <ul className="space-y-3">
              {['Collections', 'About', 'Atelier', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-body text-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground mb-6">Atelier</p>
            <p className="font-body text-foreground mb-2">{designerInfo.studioLocation}</p>
            <a href={`mailto:${designerInfo.email}`} className="font-body text-muted-foreground hover:text-primary transition-colors">
              {designerInfo.email}
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground">© {currentYear} Alex Black. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
