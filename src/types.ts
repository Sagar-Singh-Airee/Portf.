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
