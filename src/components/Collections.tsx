import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { collections as mockCollections, categories as mockCategories } from '@/data/mockData';
import { PieceModal } from '@/components/PieceModal';
import { collectionsApi, type PublicCollection, type PublicPiece, type Category } from '@/services/api';

export function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPiece, setSelectedPiece] = useState<(PublicPiece & { collectionName?: string }) | null>(null);
  const [collections, setCollections] = useState<PublicCollection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionsData, categoriesData] = await Promise.all([
          collectionsApi.getPublic(),
          collectionsApi.getCategories(),
        ]);
        
        // Use API data if available, otherwise fallback to mock
        if (collectionsData.length > 0) {
          setCollections(collectionsData);
        } else {
          setCollections(mockCollections);
        }
        setCategories(categoriesData);
      } catch (error) {
        // Fallback to mock data if API is not available
        console.log('Using mock data - backend not available');
        setCollections(mockCollections);
        setCategories(mockCategories);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const allPieces = collections.flatMap((collection) =>
    collection.pieces.map((piece) => ({
      ...piece,
      collectionName: collection.name,
    }))
  );

  // Find the active category name for filtering
  const activeCategoryObj = categories.find(c => c.id === activeCategory);
  const activeCategoryName = activeCategoryObj?.name?.toLowerCase().replace(/\s+/g, '-');

  const filteredPieces =
    activeCategory === 'all' || activeCategoryName === 'all'
      ? allPieces
      : allPieces.filter((piece) => {
          const pieceCategory = piece.category?.toLowerCase();
          return pieceCategory === activeCategoryName || 
                 piece.categoryId === activeCategory;
        });

  return (
    <section id="collections" className="section-padding-xl relative kente-pattern">
      {/* Section marker */}
      <div className="absolute left-6 lg:left-12 top-24 hidden lg:block">
        <span className="font-mono text-xs tracking-dramatic uppercase text-muted-foreground text-vertical">
          — 01 / Collections
        </span>
      </div>

      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        {/* Header with asymmetric layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <p className="font-mono text-xs tracking-dramatic uppercase text-primary mb-6">
                ▸ The Work
              </p>
              <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight">
                COLLECT
                <span className="text-stroke">IONS</span>
              </h2>
            </div>
            <p className="font-body text-lg text-muted-foreground lg:text-right max-w-md lg:ml-auto">
              Each piece is a dialogue between heritage and innovation, 
              crafted with intention in our Accra atelier.
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 font-mono text-xs tracking-dramatic uppercase transition-all duration-500 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Pieces Grid - Asymmetric Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPieces.map((piece, index) => (
              <motion.article
                key={piece.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  index % 5 === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => setSelectedPiece(piece)}
              >
                <div className={`relative overflow-hidden bg-card ${
                  index % 5 === 0 ? 'aspect-[16/9]' : 'aspect-[3/4]'
                }`}>
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="font-mono text-[10px] tracking-dramatic uppercase text-primary mb-2">
                      {'collectionName' in piece && piece.collectionName}
                    </p>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      {piece.name}
                    </h3>
                    {piece.showPrice === true && piece.price && (
                      <p className="font-mono text-sm text-primary">
                        GH₵{piece.price}
                      </p>
                    )}
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info below image */}
                <div className="pt-4 pb-2 space-y-1 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] tracking-dramatic uppercase text-muted-foreground">
                      {'collectionName' in piece && piece.collectionName}
                    </p>
                    <span className="w-8 h-px bg-border group-hover:bg-primary group-hover:w-12 transition-all duration-500" />
                  </div>
                  <h3 className="font-display text-lg tracking-tight">
                    {piece.name}
                  </h3>
                  {piece.showPrice === true && piece.price && (
                    <p className="font-mono text-sm text-primary">
                      GH₵{piece.price}
                    </p>
                  )}
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
