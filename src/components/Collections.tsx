import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { collections, categories, type Piece } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { PieceModal } from '@/components/PieceModal';

export function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  const allPieces = collections.flatMap((collection) =>
    collection.pieces.map((piece) => ({
      ...piece,
      collectionName: collection.name,
    }))
  );

  const filteredPieces =
    activeCategory === 'all'
      ? allPieces
      : allPieces.filter((piece) => piece.category === activeCategory);

  return (
    <section id="collections" className="py-24 lg:py-32">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
            The Work
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl mb-6">Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each collection tells a unique story, crafted with intention and
            brought to life through meticulous artisanship.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-sm tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'text-foreground border-b-2 border-gold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Pieces Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPieces.map((piece, index) => (
              <motion.article
                key={piece.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedPiece(piece)}
              >
                <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-4">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <Button variant="editorial" size="sm" className="w-full bg-background/90 hover:bg-background">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs tracking-[0.2em] uppercase text-gold">
                    {'collectionName' in piece && piece.collectionName}
                  </p>
                  <h3 className="font-serif text-lg group-hover:text-gold transition-colors">
                    {piece.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {piece.price}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Piece Detail Modal */}
      <PieceModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
    </section>
  );
}