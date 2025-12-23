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
        price: 'GH₵ 58,000',
        available: true,
        category: 'couture'
      },
      {
        id: 'eb-002',
        name: 'Garden Blazer',
        description: 'Tailored linen blazer with botanical print lining',
        image: pieceBlazer,
        price: 'GH₵ 14,500',
        available: true,
        category: 'ready-to-wear'
      },
      {
        id: 'eb-003',
        name: 'Bloom Clutch',
        description: 'Sculptural leather clutch with floral brass hardware',
        image: pieceClutch,
        price: 'GH₵ 8,200',
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
        price: 'GH₵ 38,500',
        available: true,
        category: 'couture'
      },
      {
        id: 'nc-002',
        name: 'Shadow Trousers',
        description: 'High-waisted wide-leg trousers in Japanese wool',
        image: pieceBlazer,
        price: 'GH₵ 10,700',
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
        price: 'GH₵ 33,800',
        available: true,
        category: 'ready-to-wear'
      },
      {
        id: 'mm-002',
        name: 'Evolution Earrings',
        description: 'Sterling silver sculptural earrings',
        image: pieceClutch,
        price: 'GH₵ 5,100',
        available: true,
        category: 'accessories'
      }
    ]
  }
];

export const designerInfo = {
  name: 'Alex Black',
  tagline: 'African Heritage, Global Elegance',
  bio: `Born and raised in Accra, Ghana, Alex Black has emerged as one of Africa's most celebrated contemporary fashion designers. His work seamlessly blends traditional Ghanaian craftsmanship with modern silhouettes, creating pieces that honor heritage while pushing boundaries.

Trained at the Accra College of Art and mentored by master kente weavers, Alex's designs have graced runways from Lagos to Milan. His philosophy centers on celebrating African textiles and artisanship—each garment tells a story of cultural pride, crafted with locally sourced materials and time-honored techniques passed down through generations.`,
  achievements: [
    'Arise Fashion Week Designer of the Year, 2022',
    'Vogue Africa Cover Feature, 2023',
    'Ghana Fashion Icon Award, 2024'
  ],
  studioLocation: 'Accra, Ghana',
  email: 'atelier@alexblack.com',
  phone: '+233 30 277 0000',
  social: {
    instagram: '@alexblackgh',
    pinterest: 'alexblackatelier'
  }
};

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'couture', name: 'Couture' },
  { id: 'ready-to-wear', name: 'Ready-to-Wear' },
  { id: 'accessories', name: 'Accessories' }
];