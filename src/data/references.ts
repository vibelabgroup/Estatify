export interface Reference {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  description: string;
  imageUrl: string;
  agent: string;
  agentSeed: string;
  layout: number;
}

export const references: Reference[] = [
  {
    id: 1,
    title: 'Modern Luxury Villa',
    location: 'Marbella, Costa Del Sol',
    price: '€2.5M',
    beds: 4,
    baths: 4.5,
    sqm: 320,
    description: 'A stunning modern luxury villa located in the heart of Marbella, offering panoramic sea views, a private infinity pool, and state-of-the-art smart home features designed to capture high-net-worth buyers.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    agent: 'Sarah Jenkins',
    agentSeed: 'Emma',
    layout: 1
  },
  {
    id: 2,
    title: 'Contemporary Penthouse',
    location: 'Puerto Banús, Marbella',
    price: '€1.8M',
    beds: 3,
    baths: 3,
    sqm: 180,
    description: 'Step into this contemporary penthouse just minutes from the marina. Featuring a wraparound terrace, outdoor kitchen, and floor-to-ceiling windows highlighting the vibrant lifestyle of Puerto Banús.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    agent: 'David Martinez',
    agentSeed: 'David',
    layout: 2
  },
  {
    id: 3,
    title: 'Classic Andalusian Estate',
    location: 'Estepona, Costa Del Sol',
    price: '€3.2M',
    beds: 6,
    baths: 5,
    sqm: 550,
    description: 'An expansive and beautifully restored classic Andalusian estate surrounded by mature gardens. This property maintains its traditional charm while offering modern luxury amenities for prospective buyers.',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    agent: 'Elena Rodriguez',
    agentSeed: 'Maria',
    layout: 3
  },
  {
    id: 4,
    title: 'Beachfront Apartment',
    location: 'Mijas Costa, Málaga',
    price: '€850k',
    beds: 2,
    baths: 2,
    sqm: 110,
    description: 'Wake up to the sound of waves in this highly desirable beachfront apartment. Fully renovated and perfect as a holiday rental investment or a peaceful coastal residence.',
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
    agent: 'Sarah Jenkins',
    agentSeed: 'Emma',
    layout: 4
  },
  {
    id: 5,
    title: 'Minimalist Sea View Villa',
    location: 'Benahavís, Andalusia',
    price: '€4.1M',
    beds: 5,
    baths: 6,
    sqm: 600,
    description: 'Defined by its clean lines and open spaces, this minimalist sea view villa offers ultimate privacy, a sunken fire pit, and direct access to top-tier golf courses.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    agent: 'David Martinez',
    agentSeed: 'David',
    layout: 5
  },
  {
    id: 6,
    title: 'Boutique Townhouse',
    location: 'Nueva Andalucía, Marbella',
    price: '€950k',
    beds: 3,
    baths: 2.5,
    sqm: 145,
    description: 'A charming boutique townhouse situated in the Golf Valley. Recently updated with Scandinavian design principles, providing a cozy yet modern living experience.',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    agent: 'Elena Rodriguez',
    agentSeed: 'Maria',
    layout: 6
  },
  {
    id: 7,
    title: 'Exclusive Golf Retreat',
    location: 'Sotogrande, Cádiz',
    price: '€5.5M',
    beds: 5,
    baths: 5.5,
    sqm: 750,
    description: 'Located in the prestigious Sotogrande, this exclusive golf retreat overlooks the 18th hole. Boasting expansive entertainment areas, a cinema room, and a pristine private pool.',
    imageUrl: 'https://images.unsplash.com/photo-1628174541786-fbcd148de49a?auto=format&fit=crop&q=80&w=800',
    agent: 'Sarah Jenkins',
    agentSeed: 'Emma',
    layout: 7
  },
  {
    id: 8,
    title: 'Sunset View Duplex',
    location: 'Fuengirola, Costa Del Sol',
    price: '€720k',
    beds: 3,
    baths: 2,
    sqm: 130,
    description: 'Enjoy breathtaking sunsets from this contemporary duplex apartment. Featuring a spacious rooftop solarium and close proximity to local amenities and beaches.',
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800',
    agent: 'David Martinez',
    agentSeed: 'David',
    layout: 8
  }
];
