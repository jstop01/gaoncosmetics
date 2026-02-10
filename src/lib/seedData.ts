import { supabase } from './supabase';

const defaultBrands = [
  {
    name: 'GREEN PEEL',
    description: '독일 프리미엄 허브 필링 시스템',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
  },
  {
    name: 'ANUBIS',
    description: '스페인 최고급 에스테틱 화장품',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop',
  },
  {
    name: 'ERBASOL',
    description: '이탈리아 천연 허브 화장품',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
  },
  {
    name: "Julie's Lim",
    description: '프리미엄 스킨케어 솔루션',
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
  },
  {
    name: 'Ordicosy',
    description: '전문가를 위한 기능성 화장품',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
  },
];

const defaultProducts = [
  {
    name: 'GREEN PEEL',
    brand: 'GREEN PEEL',
    price: 0,
    image: 'https://images.unsplash.com/photo-1590101490224-cece62b30c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY29zbWV0aWNzJTIwc2VydW0lMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwMzY0Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Dr. med. Christine SCHRAMMEK 전문 필링 트리트먼트',
    is_special: false,
  },
  {
    name: 'ANUBIS',
    brand: 'ANUBIS',
    price: 0,
    image: 'https://images.unsplash.com/photo-1736753574025-852bc275cb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWFrZXVwJTIwcHJvZHVjdHMlMjBtaW5pbWFsJTIwYWVzdGhldGljfGVufDF8fHx8MTc3MDM2NDI5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '에스테틱 전문 스킨케어 제품',
    is_special: true,
    discount_percentage: 20,
  },
  {
    name: 'ERBASOL',
    brand: 'ERBASOL',
    price: 0,
    image: 'https://images.unsplash.com/photo-1739980213756-753aea153bb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBwcm9kdWN0cyUyMG1hcmJsZXxlbnwxfHx8fDE3NzAzNjQyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '천연 허브 성분 화장품',
    is_special: false,
  },
  {
    name: "Julie's Lim",
    brand: "Julie's Lim",
    price: 0,
    image: 'https://images.unsplash.com/photo-1768254636839-9a2d2619c861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJvdHRsZSUyMG5hdHVyZSUyMHBsYW50fGVufDF8fHx8MTc3MDM2NDI5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '아로마테라피 전문 제품',
    is_special: false,
  },
  {
    name: 'Ordicosy',
    brand: 'Ordicosy',
    price: 0,
    image: 'https://images.unsplash.com/photo-1590101490224-cece62b30c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY29zbWV0aWNzJTIwc2VydW0lMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwMzY0Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '에스테틱 전문 케어 제품',
    is_special: false,
  },
];

export async function seedIfEmpty() {
  const { count: brandCount } = await supabase
    .from('brands')
    .select('*', { count: 'exact', head: true });

  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if ((brandCount ?? 0) === 0 && (productCount ?? 0) === 0) {
    console.log('[seed] Supabase is empty, seeding default data...');
    await supabase.from('brands').insert(defaultBrands);
    await supabase.from('products').insert(defaultProducts);
    console.log('[seed] Done! Seeded 5 brands and 5 products.');
  } else {
    console.log('[seed] Supabase already has data, skipping seed.');
  }
}
