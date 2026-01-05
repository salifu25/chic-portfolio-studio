import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PublicPiece } from '@/services/api';

interface PieceModalProps {
  piece: (PublicPiece & { collectionName?: string }) | null;
  onClose: () => void;
}

export function PieceModal({ piece, onClose }: PieceModalProps) {
  if (!piece) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-background"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square md:aspect-auto md:min-h-[500px] bg-muted overflow-hidden">
              <img
                src={piece.image}
                alt={piece.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 space-y-6">
              <div>
                <p className="text-sm tracking-[0.2em] uppercase text-gold mb-2">
                  {piece.category?.replace('-', ' ') || 'Collection Piece'}
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl mb-4">
                  {piece.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {piece.description}
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-baseline justify-between mb-6">
                  {piece.showPrice === true && piece.price && (
                    <span className="font-serif text-2xl">GH₵{piece.price}</span>
                  )}
                  <span
                    className={`text-sm tracking-[0.15em] uppercase ${
                      piece.available ? 'text-gold' : 'text-muted-foreground'
                    }`}
                  >
                    {piece.available ? 'Available' : 'Made to Order'}
                  </span>
                </div>

                <div className="space-y-3">
                  <Button variant="editorial" className="w-full" size="lg">
                    {piece.available ? 'Request to Purchase' : 'Commission This Piece'}
                  </Button>
                  <Button variant="minimal" className="w-full" size="lg" asChild>
                    <a href="#book">Schedule Fitting</a>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  All pieces are handcrafted in our Paris atelier.
                  <br />
                  Delivery time: 4-6 weeks for available pieces.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}