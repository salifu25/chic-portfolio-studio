import pieceGown from '@/assets/piece-gown.jpg';
import pieceBlazer from '@/assets/piece-blazer.jpg';
import pieceClutch from '@/assets/piece-clutch.jpg';
import pieceCape from '@/assets/piece-cape.jpg';

export interface Collection {
  id: string;
  name: string;
  season: string;
  year: number;
  description: string;
  coverImage: string;
  pieces: Piece[];
}

export interface Piece {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  available: boolean;
  category: 'ready-to-wear' | 'couture' | 'accessories';
}

export const collections: Collection[] = [
  {
    id: 'ethereal-bloom',
    name: 'Ethereal Bloom',
    season: 'Spring/Summer',
    year: 2024,
    description: 'A celebration of nature\'s delicate beauty, where flowing silhouettes meet organic textures. Each piece tells a story of renewal and grace.',
    coverImage: pieceGown,
    pieces: [
      {
        id: 'eb-001',
        name: 'Petal Gown',
        description: 'Hand-draped silk organza gown with delicate floral embroidery',
        image: pieceGown,
        price: '$4,800',
        available: true,
        category: 'couture'
      },
      {
        id: 'eb-002',
        name: 'Garden Blazer',
        description: 'Tailored linen blazer with botanical print lining',
        image: pieceBlazer,
        price: '$1,200',
        available: true,
        category: 'ready-to-wear'
      },
      {
        id: 'eb-003',
        name: 'Bloom Clutch',
        description: 'Sculptural leather clutch with floral brass hardware',
        image: pieceClutch,
        price: '$680',
        available: false,
        category: 'accessories'
      }
    ]
  },
  {
    id: 'nocturne',
    name: 'Nocturne',
    season: 'Fall/Winter',
    year: 2024,
    description: 'Inspired by the mystery of twilight hours. Rich textures, deep tones, and architectural silhouettes define this introspective collection.',
    coverImage: pieceCape,
    pieces: [
      {
        id: 'nc-001',
        name: 'Midnight Cape',
        description: 'Wool cape with silk velvet lining and hand-finished edges',
        image: pieceCape,
        price: '$3,200',
        available: true,
        category: 'couture'
      },
      {
        id: 'nc-002',
        name: 'Shadow Trousers',
        description: 'High-waisted wide-leg trousers in Japanese wool',
        image: pieceBlazer,
        price: '$890',
        available: true,
        category: 'ready-to-wear'
      }
    ]
  },
  {
    id: 'metamorphosis',
    name: 'Metamorphosis',
    season: 'Resort',
    year: 2025,
    description: 'A journey of transformation. Fluid forms that evolve with movement, celebrating the beauty of change and personal evolution.',
    coverImage: pieceGown,
    pieces: [
      {
        id: 'mm-001',
        name: 'Chrysalis Dress',
        description: 'Layered silk dress with transformative draping',
        image: pieceGown,
        price: '$2,800',
        available: true,
        category: 'ready-to-wear'
      },
      {
        id: 'mm-002',
        name: 'Evolution Earrings',
        description: 'Sterling silver sculptural earrings',
        image: pieceClutch,
        price: '$420',
        available: true,
        category: 'accessories'
      }
    ]
  }
];

export const designerInfo = {
  name: 'Elara Vance',
  tagline: 'Where Art Meets Attire',
  bio: `With over a decade of experience in haute couture, Elara Vance has established herself as a visionary in contemporary fashion. Her work bridges the gap between art and wearability, creating pieces that tell stories and evoke emotion.

Based in Paris and trained at Central Saint Martins, Elara's designs have graced international runways and red carpets. Her philosophy centers on sustainable luxury—each garment is crafted with intention, using ethically sourced materials and time-honored techniques.`,
  achievements: [
    'CFDA Emerging Designer Award, 2019',
    'Vogue Italia Cover Feature, 2021',
    'Sustainable Fashion Pioneer Award, 2023'
  ],
  studioLocation: 'Paris, France',
  email: 'atelier@elaravance.com',
  phone: '+33 1 42 60 00 00',
  social: {
    instagram: '@elaravance',
    pinterest: 'elaravanceatelier'
  }
};

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'couture', name: 'Couture' },
  { id: 'ready-to-wear', name: 'Ready-to-Wear' },
  { id: 'accessories', name: 'Accessories' }
];