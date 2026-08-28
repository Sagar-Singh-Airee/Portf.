export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  client: string;
  location: string;
  description: string;
  concept: string;
  outcome: string;
  tools: string[];
  image: string;
  accentBg?: string;
  aspect?: string;
  tags: string[];
  gallery: string[];
  featured?: boolean;
  github?: string;
  metrics?: { label: string; val: string }[];
}

export interface Exhibition {
  id: string;
  number: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  status: 'Upcoming' | 'Sold Out' | 'Free Entry' | 'Current';
  curator: string;
  description: string;
  ticketsRemaining: number;
  talkType?: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}
