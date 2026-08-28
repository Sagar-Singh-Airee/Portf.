import { Project, Exhibition, StatItem } from '../types';

import heroImg from '../assets/images/hero_creator_camera_1787888211482.jpg';
import aboutImg from '../assets/images/about_creator_monochrome_1787888232716.jpg';
import treeImg from '../assets/images/minimalist_tree_silhouette_1787888276756.jpg';
import archImg from '../assets/images/curved_white_architecture_1787888300727.jpg';
import ferrisImg from '../assets/images/ferris_wheel_minimal_1787888325854.jpg';
import palmImg from '../assets/images/golden_palm_minimal_1787888251134.jpg';

export const HERO_ASSETS = {
  heroCreator: heroImg,
  aboutMonochrome: aboutImg,
  goldenPalm: palmImg,
  signature: 'Arturo Quintany',
};

export const HERO_STATS: StatItem[] = [
  {
    value: '+250k',
    label: 'People reached',
    description: 'Videos that reaching a wide audience and give lasting impression',
  },
  {
    value: '+800k',
    label: 'Hours watched',
    description: 'Hours watched, engaging storytelling that captivates viewers',
  },
  {
    value: '12+',
    label: 'Creative projects',
    description: 'International exhibitions & museum presentations worldwide',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'ethereal-monolith',
    number: '01',
    title: 'Ethereal Monolith',
    subtitle: 'Brutalist Architecture & High-Key Light Study',
    year: '2026',
    category: 'Architecture',
    client: 'Fondazione Prada & Studio Architetti',
    location: 'Milan, Italy',
    description:
      'An examination of concrete geometry illuminated by diffused northern daylight. Through monochrome high-key photography, the monolithic forms dissolve into pure sculptured planes and shadow rhythms.',
    concept:
      'Challenging the perceived heaviness of concrete by treating monumental structures as lightweight paper folds under stark atmospheric skies.',
    outcome:
      'Featured in Domus Magazine, displayed across 4 European contemporary architecture biennales, and printed in a limited monograph.',
    tools: ['Hasselblad H6D-100c', 'HC 35mm f/3.5', 'Capture One Pro', 'Kodak Tri-X 400 Simulation'],
    image: archImg,
    aspect: 'aspect-[4/5]',
    tags: ['Architecture', 'Monochrome', 'Minimalism'],
    gallery: [
      archImg,
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'solitude-in-mist',
    number: '02',
    title: 'Solitude in Mist',
    subtitle: 'Poetic Minimalist Flora Study',
    year: '2025',
    category: 'Cinema',
    client: 'Nordic Cultural Heritage Institute',
    location: 'Lapland, Finland',
    description:
      'Captured during the white winter thaw where horizon lines vanish entirely. A single bare tree stands as an anchor point in an ocean of ethereal sub-zero fog.',
    concept:
      'Extracting visual noise until only the fundamental essence of resilience and stillness remains in the camera frame.',
    outcome:
      'Awarded First Prize at the Tokyo International Foto Awards 2025 in Fine Art Nature category.',
    tools: ['Leica M11 Monochrom', 'APO-Summicron-M 50mm f/2 ASPH', 'Silver Gelatin Print Process'],
    image: treeImg,
    aspect: 'aspect-[3/4]',
    tags: ['Cinema', 'Fine Art', 'Landscape'],
    gallery: [
      treeImg,
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'parametric-currents',
    number: '03',
    title: 'Parametric Currents',
    subtitle: 'Organic Curvature & Spatial Void',
    year: '2026',
    category: 'Architecture',
    client: 'Zaha Hadid Pavilions Archive',
    location: 'Basel, Switzerland',
    description:
      'Documenting fluid structural curves that mimic aquatic currents and aerodynamic contours. White surfaces capture delicate tonal transitions of indirect sunlight.',
    concept:
      'Translating digital mathematical algorithms into tactile physical sensory experiences captured through cinematic framing.',
    outcome:
      'Permanent acquisition by Basel Architecture Museum and featured in architectural publications worldwide.',
    tools: ['Sony FX9', 'Arri Signature Primes 24mm', 'DaVinci Resolve Studio'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
    tags: ['Architecture', 'Cinema', 'Form'],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      archImg,
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'london-eye-geometry',
    number: '04',
    title: 'Frames of Motion',
    subtitle: 'Mechanical Rotations in Thames Fog',
    year: '2025',
    category: 'Experimental',
    client: 'Tate Modern Cultural Series',
    location: 'London, United Kingdom',
    description:
      'A deconstruction of the iconic Ferris wheel silhouette against Thames river winter fog. Focusing on the tension of steel cables and repeating spoke geometry.',
    concept:
      'Time perceived through mechanical cycles: capturing stationary steel components in stillness while implying continuous kinetic orbital motion.',
    outcome:
      'Solo exhibition at Tate Modern Project Space with over 140,000 visitors in autumn 2025.',
    tools: ['Bolex H16 Reflex 16mm Film', 'Angénieux 12-120mm Zoom', 'CineLab 2K Film Scan'],
    image: ferrisImg,
    aspect: 'aspect-[1/1]',
    tags: ['Experimental', 'Geometry', '16mm Film'],
    gallery: [
      ferrisImg,
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'sculptural-drapery',
    number: '05',
    title: 'Whispering Pleats',
    subtitle: 'Tactile Textiles & Kinetic Shadows',
    year: '2026',
    category: 'Direction',
    client: 'Maison Issey Miyake & Milan Fashion Week',
    location: 'Paris, France',
    description:
      'A poetic visual exploration of pleated micro-fabrics moving through air currents. Light grazes structural folds, transforming fashion garments into ephemeral living sculptures.',
    concept:
      'The body as an ephemeral landscape where fabric becomes a mediator between human breathing and architectural silence.',
    outcome:
      'Commissioned runway film for Paris Fashion Week, projected on 18-meter LED canvases inside Palais de Tokyo.',
    tools: ['Arri Alexa Mini LF', 'Leitz Thalia Primes', '35mm Film Grain Emulation'],
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
    tags: ['Direction', 'Fashion', 'Sculpture'],
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'golden-botanical',
    number: '06',
    title: 'Amber Chromatics',
    subtitle: 'Golden Hour Botanical Abstraction',
    year: '2026',
    category: 'Experimental',
    client: 'Editorial Commission / Kinfolk Magazine',
    location: 'Valencia, Spain',
    description:
      'A deliberate departure into saturated warmth: golden palm fronds held against vibrant mustard amber planes. Graphic silhouettes casting razor-sharp noon shadows.',
    concept:
      'Monochromatic warm saturation as an emotional catalyst, bridging mid-century Mediterranean warmth with contemporary graphic clarity.',
    outcome:
      'Cover story of Kinfolk Issue 52 and permanent installation at Madrid Center of Contemporary Arts.',
    tools: ['Contax 645', 'Carl Zeiss Planar 80mm f/2', 'Kodak Portra 400 Rated at 200'],
    image: palmImg,
    accentBg: '#FFB52E',
    aspect: 'aspect-[1/1]',
    tags: ['Experimental', 'Color Study', 'Botanical'],
    gallery: [
      palmImg,
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'cinematic-horizons',
    number: '07',
    title: 'The Silent Coastline',
    subtitle: 'Cinematic Anamorphic Stillness',
    year: '2025',
    category: 'Cinema',
    client: 'A24 Films Visual Reference Archive',
    location: 'Reykjavik, Iceland',
    description:
      'Widescreen cinematic vistas captured with vintage anamorphic glass. Glacial black sand deserts illuminated by solitary blue twilight flares.',
    concept:
      'Cinema beyond dialogue: using pure atmospheric scale and visual pacing to communicate vastness and inner introspection.',
    outcome:
      'Acquired as official reference aesthetic for upcoming feature film project and exhibited at Reykjavik Museum of Art.',
    tools: ['Red V-Raptor 8K VV', 'Atlas Orion 2x Anamorphic', 'ACES Color Pipeline'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[16/9]',
    tags: ['Cinema', 'Anamorphic', 'Atmosphere'],
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
];

export const EXHIBITIONS: Exhibition[] = [
  {
    id: 'ex-01',
    number: '01',
    title: 'Cinematic Visions Unveiled',
    venue: 'Madrid Contemporary Gallery, Sala Canal',
    location: 'Madrid, Spain',
    date: '21 Nov 2026',
    status: 'Upcoming',
    curator: 'Elena Montero (Reina Sofía Fellow)',
    description:
      'A multi-screen immersive video and fine-art print installation examining the boundary between physical film emulsion and algorithmic generative motion.',
    ticketsRemaining: 34,
  },
  {
    id: 'ex-02',
    number: '02',
    title: 'Frames in Motion',
    venue: 'Manchester Museum of Contemporary Art',
    location: 'Manchester, United Kingdom',
    date: '20 Nov 2026',
    status: 'Upcoming',
    curator: 'David Thorne (Tate Modern Senior Guest Curator)',
    description:
      'Exploring kinetic architecture, 16mm mechanical grain, and urban rhythmic loops captured across four European industrial capitals.',
    ticketsRemaining: 58,
  },
  {
    id: 'ex-03',
    number: '03',
    title: 'Journey Through Time',
    venue: 'Palazzo delle Esposizioni & Milan Gallery',
    location: 'Milan, Italy',
    date: '19 Nov 2026',
    status: 'Upcoming',
    curator: 'Matteo Bellini (Milan Design Triennale)',
    description:
      'An architectural spatial essay documenting shadow transitions, concrete textures, and human absence across historic Italian modernist landmarks.',
    ticketsRemaining: 18,
  },
  {
    id: 'ex-04',
    number: '04',
    title: 'Experimental Narratives',
    venue: 'Palais de Tokyo Project Space',
    location: 'Paris, France',
    date: '18 Nov 2026',
    status: 'Upcoming',
    curator: 'Camille Leroux (Centre Pompidou)',
    description:
      'Tactile fabric studies and high-speed choreography presented on synchronized 8K kinetic light columns with live atmospheric soundscape.',
    ticketsRemaining: 12,
  },
  {
    id: 'ex-05',
    number: '05',
    title: 'Echoes of Light & Shadow',
    venue: 'Bauhaus Archive & Museum of Form',
    location: 'Berlin, Germany',
    date: '12 Dec 2026',
    status: 'Upcoming',
    curator: 'Klaus Reinhardt (Bauhaus Research Fund)',
    description:
      'A retrospective tribute to geometric purity, functionalist framing, and monochrome medium format silver gelatin prints.',
    ticketsRemaining: 75,
  },
];
